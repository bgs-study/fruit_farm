import 'express-async-errors';
import db from '../models/index.js';

// 농장주가 해당 농장의 체험시같표 조회 => pagination구현
export async function getTimeTables(req, res, next) {
	const { lastId, limit } = req.query;
	try {
		const farmerId = req.farmerId;
		const farmId = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (!farmId) {
			throw new Error('해당 농장주는 농장등록을 하지 않았습니다.');
		}
		const data = await db.TimeTables.getTimeTables(farmId, lastId, limit);
		// 페이지네이션 cursor 기반 구현 코치님 이 방법이 올바른 방법인지 궁금합니다.
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
}

//	일반 사용자가 해당 농장의 체험시간표 조회 => pagination x (함수이름 헷갈림 주의)
export async function getTimeTable(req, res, next) {
	try {
		const { id } = req.params; // 농장아이디
		const tables = await db.TimeTables.findtimetableFromFarmId(id);
		if (!tables) {
			throw new Error('해당농장의 시간표가 등록되지 않았습니다.');
		}
		res.status(200).json(tables);
	} catch (err) {
		next(err);
	}
}

export async function createTimeTable(req, res, next) {
	const { date, personnel, price, start_time, end_time } = req.body;
	try {
		const farmId = await db.Farmers.findById(req.farmerId).then((data) => {
			return data.dataValues.farmId;
		});
		if (!farmId) {
			throw new Error('농장을 등록하고 체험시간표를 생성해야합니다.');
		}
		const tableInfo = {
			date,
			personnel,
			price,
			start_time,
			end_time,
			farmId,
		};
		const timeTable = await db.TimeTables.createTable(tableInfo);
		res.status(201).json(timeTable);
	} catch (err) {
		next(err);
	}
}

export async function updateTimeTable(req, res, next) {
	const { date, personnel, price, start_time, end_time } = req.body;
	const { id } = req.params;
	const farmerId = req.farmerId;
	try {
		const found = await db.TimeTables.getById(id);

		if (!found) {
			return res.status(404).json(`해당 시간표 id:${id} 를 찾지 못 했습니다 `);
		}
		const farmIdFromFarmer = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (farmIdFromFarmer !== found.farmId) {
			throw new Error('해당 농장주만 체험시간표를 수정할 수 있습니다.');
		}
		const toUpdate = {
			date,
			personnel,
			price,
			start_time,
			end_time,
		};
		const updatedTiemTable = await db.TimeTables.updateTable(toUpdate, id);
		res.status(200).json(updatedTiemTable);
	} catch (err) {
		next(err);
	}
}

export async function removeTimeTable(req, res, next) {
	const { id } = req.params;
	const farmerId = req.farmerId;
	try {
		const found = await db.TimeTables.getById(id);
		if (!found) {
			return res.status(404).json(`해당 시간표 id:${id} 를 찾지 못 했습니다 `);
		}
		const farmIdFromFarmer = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (farmIdFromFarmer !== found.farmId) {
			throw new Error('해당 농장주만 체험시간표를 삭제할 수 있습니다.');
		}
		await db.TimeTables.remove(id);
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
}
