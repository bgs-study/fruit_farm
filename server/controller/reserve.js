import 'express-async-errors';
import db from '../models/index.js';

// 구현 중
export async function reserve(req, res, next) {
	const { time_id, total_price, personnel, payment, name, phoneNum, email } =
		req.body;
	const user_id = req.userId;

	const ispersonnel = await db.TimeTables.getById(time_id);
	if(ispersonnel.personnel < personnel) {
		throw new Error('해당 예약의 정원보다 신청 인원이 더 많습니다.')
	}

	try {
		const new_reserve = await db.Reservations.createReserve({
			total_price,
			user_id,
			time_id,
			payment,
			name,
			phoneNum,
			email,
			personnel,
		});
		db.TimeTables.getById(new_reserve.dataValues.time_id).then( data => {
			return data.decrement('personnel', {by: new_reserve.dataValues.personnel})
		}).then(data => {
			data.reload();
		})

		res.status(201).json(new_reserve);
	} catch (err) {
		next(err);
	}
}

export async function reserveDrop(req, res, next) {
	const userId = req.userId;
	const id = req.params.id;
	try {
		const found = await db.Reservations.findByUserId(userId);
		const reservation = await db.Reservations.findByReserveId(id, userId);
		if (!found) {
			throw new Error('해당 유저의 예약 내역은 없습니다.');
		}
		if (!reservation) {
			throw new Error('유저의 해당 예약이 없습니다.');
		}

		const reserve = await db.Reservations.deleteReserve(id);

		res.status(200).json({ id: id, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}

export async function getReserveData(req, res, next) {
	const id = req.userId;

	try {
		const timeId = []; // 예약한 것들의 타임 id
		const timeInfo = [];

		let results = [];
		const reserve = await db.Reservations.findByUserId(id);
		if (!reserve) {
			throw new Error('유저의 예약 내역이 없습니다.');
		}

		reserve.forEach((res) => timeId.push(res.time_id));

		for (let i = 0; i < timeId.length; i++) {
			const time = await db.TimeTables.getAll(timeId[i]);
			timeInfo.push({
				id: time.id,
				date: time.date,
				start_time: time.start_time,
				end_time: time.end_time,
				people: time.personnel,
				address: time.dataValues.address,
				name: time.dataValues.name,
				url: time.dataValues.url,
			});
		}
		for (let i = 0; i < reserve.length; i++) {
			const review = await db.Reviews.findByReserveId(reserve[i].id);
			if (review !== null) {
				results.push({
					info: timeInfo[i],
					reserve: {
						id: reserve[i].id,
						total_price: reserve[i].total_price,
						status: reserve[i].status,
						personnel: reserve[i].personnel,
						payment: reserve[i].payment,
						review: review.dataValues.content,
					},
				});
			} else {
				results.push({
					info: timeInfo[i],
					reserve: {
						id: reserve[i].id,
						total_price: reserve[i].total_price,
						status: reserve[i].status,
						personnel: reserve[i].personnel,
						payment: reserve[i].payment,
					},
				});
			}
		}
		res.status(200).json(results);
	} catch (err) {
		next(err);
	}
}

export async function getFarmerData(req, res, next) {
	const id = req.farmerId;

	try {
		const farm = await db.Farmers.getFarmIdFromFarmer(id); //해당 농장주의 농장아이디 찾음
		if (!farm) {
			throw new Error('해당 농장주는 등록된 농장이 없습니다.');
		}

		const data = []; // 해당 농장이 저장해둔 타임테이블 id
		const timeNum = []; // 해당 농장 주인의 타임테이블에 있는 값 중 예약 건 수의 타임 아이디
		const datas = [];
		const timeInfo = [];

		let resultInfo = [];
		const result = await db.TimeTables.findFarmId(farm);
		if (!result) {
			throw new Error('해당 농장아이디의 시간표가 없습니다.');
		}

		result.forEach((time) => data.push(time.id));

		for (let i = 0; i < data.length; i++) {
			const reserve = await db.Reservations.findByTimeId(data[i]);
			reserve.forEach((res) => {
				datas.push(res);
				timeNum.push(res.time_id);
			});
		}

		for (let i = 0; i < timeNum.length; i++) {
			const time = await db.TimeTables.getById(timeNum[i]);
			timeInfo.push({
				date: time.date,
				start_time: time.start_time,
				end_time: time.end_time,
				people: time.personnel,
			});
		}

		for (let i = 0; i < datas.length; i++) {
			resultInfo.push({ time: timeInfo[i], reserve: datas[i] });
		}

		res.status(200).json(resultInfo);
	} catch (err) {
		next(err);
	}
}

async function setReserve(reserveInfo, toUpdate) {
	const { id, userId } = reserveInfo;

	let reserve = await db.Reservations.findByReserveId(id, userId);

	if (!reserve) {
		throw new Error('해당 예약이 없습니다. 다시 한 번 확인해 주세요.');
	}
	reserve = await db.Reservations.updateReserve({
		id,
		update: toUpdate,
	});

	return reserve;
}

export async function reserveUpdate(req, res, next) {
	const id = req.params.id;
	const userId = req.userId;

	const found = await db.Reservations.findByUserId(userId);
	const reservation = await db.Reservations.findByReserveId(id, userId);
	if (!found) {
		throw new Error('해당 유저의 예약 내역은 없습니다.');
	}
	if (!reservation) {
		throw new Error('유저의 해당 예약이 없습니다.');
	}

	const {
		time_id,
		total_price,
		personnel,
		payment,
		name,
		phoneNum,
		email,
		status,
	} = req.body;

	try {
		const reserveInfo = { id, userId };

		const toUpdate = {
			...(time_id && { time_id }),
			...(total_price && { total_price }),
			...(personnel && { personnel }),
			...(status && { status }),
			...(payment && { payment }),
			...(name && { name }),
			...(email && { email }),
			...(phoneNum && { phoneNum }),
		};

		const reserve = await db.Reservations.findByReserveId(id, userId);

		if (reserve.status === '체험완료') {
			throw new Error('유저는 체험이 완료되어 변경할 수 없습니다.');
		}

		if (toUpdate.status === '예약취소') {
			const reserveInfo = await db.Reservations.findByReserveNumId(id);
			db.TimeTables.getById(reserveInfo.dataValues.time_id).then( data => {
				return data.increment('personnel', {by: reserveInfo.dataValues.personnel})
			}).then(data => {
				data.reload();
			})
		}
		

		const updateReserveInfo = await setReserve(reserveInfo, toUpdate);
		res.status(200).json({ message: 'update!' });
	} catch (err) {
		next(err);
	}
}

async function setReserveFarmer(reserveInfo, toUpdate) {
	const { id } = reserveInfo;

	let reserve = await db.Reservations.findByReserveNumId(id);

	if (!reserve) {
		throw new Error('해당 예약이 없습니다. 다시 한 번 확인해 주세요.');
	}

	reserve = await db.Reservations.updateReserve({
		id,
		update: toUpdate,
	});

	return reserve;
}

export async function reserveFarmerUpdate(req, res, next) {
	const id = req.params.id;
	const farmerId = req.farmerId;

	try {
		const reserve = await db.Reservations.findByReserveNumId(id);
		if (!reserve) {
			throw new Error('해당 농장에 대한 예약 정보가 없습니다');
		}

		const farmId = await db.Farmers.getFarmIdFromFarmer(farmerId);
		const timeId = await db.Reservations.findByReserveNumId(id);
		const timeFarmId = await db.TimeTables.getById(timeId.dataValues.time_id);

		if (farmId !== timeFarmId.dataValues.farmId) {
			throw new Error(
				'해당 농장주의 농장 정보랑 조회하려는 농장 정보가 다릅니다.',
			);
		}

		const {
			time_id,
			total_price,
			personnel,
			payment,
			name,
			phoneNum,
			email,
			status,
		} = req.body;

		const reserveInfo = { id };

		const toUpdate = {
			...(time_id && { time_id }),
			...(total_price && { total_price }),
			...(personnel && { personnel }),
			...(status && { status }),
			...(payment && { payment }),
			...(name && { name }),
			...(email && { email }),
			...(phoneNum && { phoneNum }),
		};

		const updateReserveInfo = await setReserveFarmer(reserveInfo, toUpdate);
		res.status(200).json({ message: 'update!' });
	} catch (err) {
		next(err);
	}
}

export async function reserveFarmerDrop(req, res, next) {
	const id = req.params.id;
	const farmerId = req.farmerId;

	const reserve = await db.Reservations.findByReserveNumId(id);
	if (!reserve) {
		throw new Error('해당 농장에 대한 예약 정보가 없습니다');
	}

	const farmId = await db.Farmers.getFarmIdFromFarmer(farmerId);
	const timeId = await db.Reservations.findByReserveNumId(id);
	const timeFarmId = await db.TimeTables.getById(timeId.dataValues.time_id);

	if (farmId !== timeFarmId.dataValues.farmId) {
		throw new Error(
			'해당 농장주의 농장 정보랑 조회하려는 농장 정보가 다릅니다.',
		);
	}
	const result = await db.Reservations.deleteReserve(id);

	res.status(200).json({ message: 'delete!' });
}
