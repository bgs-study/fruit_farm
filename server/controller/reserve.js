import 'express-async-errors';
import db from '../models/index.js';

export async function reserve(req, res, next) {
	const { date, total_price, time, farm_id, personnel } = req.body;
	const user_id = req.userId;

	try {
		const new_reserve = await db.Reservations.createReserve({
			date,
			total_price,
			time,
			user_id,
			farm_id,
			personnel,
		});
		res.status(201).json(new_reserve);
	} catch (err) {
		next(err);
	}
}

export async function reserveList(req, res, next) {
	try {
		const reserves = await db.Reservations.getReserve();
		if (!reserve) {
			throw new Error(
				'예약을 불러오는데 문제가 발생했습니다. 다시 한 번 확인해 주세요.',
			);
		}

		res.status(200).json(reserves);
	} catch (err) {
		next(err);
	}
}

export async function reserveDrop(req, res, next) {
	const id = req.params.id;
	try {
		const reserve = await db.Reservations.deleteReserve(id);

		res.status(200).json({ id: id, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}

export async function getReserveData(req, res, next) {
	const id = req.params.id;

	try {
		const reserve = await db.Reservations.findByReserveId(id);
		res.status(200).json(reserve);
	} catch (err) {
		next(err);
	}
}

async function setReserve(reserveInfo, toUpdate) {
	const { id } = reserveInfo;

	let reserve = await db.Reservations.findByReserveId(id);

	if (!reserve) {
		throw new Error('해당 예약이 없습니다. 다시 한 번 확인해 주세요.');
	}

	reserve = await db['Reservations'].updateReserve({
		id,
		update: toUpdate,
	});

	return reserve;
}

export async function reserveUpdate(req, res, next) {
	const id = req.params.id;
	const { date, total_price, status, time, farm_id, personnel } = req.body;

	try {
		const reserveInfo = { id };

		const toUpdate = {
			...(date && { date }),
			...(total_price && { total_price }),
			...(status && { status }),
			...(time && { time }),
			...(farm_id && { farm_id }),
			...(personnel && { personnel }),
		};
		const updateReserveInfo = await setReserve(reserveInfo, toUpdate);
		res.status(200).json(updateReserveInfo);
	} catch (err) {
		next(err);
	}
}
