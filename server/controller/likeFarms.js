import 'express-async-errors';
import db from '../models/index.js';

export async function like(req, res, next) {
	const user_id = req.userId;
	const farm_id = req.params.farmId;

	try {
		const user = await db.LikeFarms.findLike(user_id);

		const data = [];

		user.forEach((user) => data.push(user.farm_id));

		if (data.includes(Number(farm_id))) {
			throw new Error('이미 찜한 농장입니다.');
		}

		const like = await db.LikeFarms.createLike({
			user_id,
			farm_id,
		});

		res.status(201).json(like);
	} catch (err) {
		next(err);
	}
}

export async function likecancel(req, res, next) {
	const user_id = req.userId;
	const farm_id = req.params.farmId;

	try {
		const found = await db.LikeFarms.findLike(user_id);

		if (!found) {
			throw new Error('해당 유저가 찜한 체험은 없습니다.');
		}

		const data = [];
		found.forEach((found) => data.push(found.farm_id));

		if (!data.includes(Number(farm_id))) {
			throw new Error('해당 농장에 대한 찜 정보가 없습니다.');
		}

		const cancel = await db.LikeFarms.deleteLike(user_id, farm_id);

		res.status(200).json({ message: 'delete!' });
	} catch (err) {
		next(err);
	}
}

export async function getLikeData(req, res, next) {
	const user_id = req.userId;

	try {
		const found = await db.LikeFarms.findLike(user_id); //[{}, {}, {}] -> 유저의 찜한 정보
		// [{}, {}, {}]

		if (!found) {
			throw new Error('해당 유저가 찜한 체험은 없습니다.');
		}

		const farmId = []; // [10,11, 1]
		const datas = []; // [{}, {}, {}] -> 찜한 농장 정보
		let result = [];

		found.forEach((data) => farmId.push(data.farm_id));

		for (let i = 0; i < farmId.length; i++) {
			const farm = await db.Farms.findById(farmId[i]);
			datas.push(farm.dataValues);
		}

		for (let i = 0; i < datas.length; i++) {
			// result.push({like :found[i].dataValues, farm: datas[i]})
			result.push(datas[i]);
		}

		res.status(200).json(result);
	} catch (err) {}
}
