import 'express-async-errors';
import db from '../models/index.js';
import { upload } from '../middleware/s3.js';
import multer from 'multer';

// 서비스가 확장되어 타입이 늘어나면 ex (딸기, 수박, 파인애플 등등) 특정타입을 받아 특정타입의 농장을 조회
export async function getFarms(req, res, next) {
	const { type } = req.query;
	const { lastId, limit } = req.query;
	const data = await (type
		? db.Farms.getByType(type) //
		: db.Farms.getAll(lastId, limit));
	if (!data) {
		return res.status(404).json({ message: '해당 농장을 찾을 수 없습니다.' });
	}
	res.status(200).json(data);
}

export async function getFarm(req, res, next) {
	const farmerId = req.farmerId;
	try {
		const farmerInfo = await db.Farmers.getFarmInfo(farmerId);
		const farmId = farmerInfo.farmId;
		const farmInfo = await db.Farms.findById(farmId);
		res.status(200).json({ farmInfo, farmerInfo });
	} catch (err) {
		next(err);
	}
}

export async function getByLocation(req, res, next) {
	const { location } = req.query;
	const data = await db.Farms.getByAddress(location);
	if (!data) {
		return res.status(404).json({ message: '해당지역에는 농장이 없습니다.' });
	}
	res.status(200).json(data);
}

export async function getByFarm(req, res, next) {
	const id = req.params.farmId;
	try {
		const reviewInfo = [];
		const data = await db.Farms.findById(id);
		const review = await db.Reviews.findByFarmIdAndUser(id); //배열
		const farmer = await db.Farmers.getFarmerInfoFromFarmId(id);

		for (let i = 0; i < review.length; i++) {
			reviewInfo.push({
				id: review[i].id,
				content: review[i].content,
				rating: review[i].rating,
				farm_id: review[i].farm_id,
				date: review[i].createdAt,
				name: review[i].dataValues.name,
				email: review[i].dataValues.email
			});
		}

		const datas = { data, reviewInfo, farmer };

		res.status(200).json(datas);
	} catch (err) {
		next(err);
	}
}

export async function createFarm(req, res, next) {
	const { type, name, address, description, owner } = req.body;

	try {
		// 이미지를 s3에 에러핸들링 후 넣어야함 (미구현)
		const locations = req.files.map((data) => data.location);
		const url = locations.toString();
		const farmerId = req.farmerId;
		const foundFarmer = db.Farmers.findById(farmerId);
		if (!foundFarmer) {
			throw new Error('농장등록은 농장주만 등록할 수 있습니다.');
		}
		const checkFarmId = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (checkFarmId) {
			throw new Error('농장주는 하나의 농장만 등록할 수 있습니다');
		}
		const farm = await db.Farms.createFarm({
			type,
			name,
			address,
			description,
			owner,
			url,
		});
		await db.Farmers.registeFarmId(farm.dataValues.id, farmerId);
		res.status(201).json(farm);
	} catch (err) {
		next(err);
	}
}

export async function updateFarm(req, res, next) {
	const { type, name, address, description, owner } = req.body;
	let url = req.body.url;
	try {
		const { id } = req.params;
		const farmerId = req.farmerId;
		if (!id) {
			throw new Error('해당 농장을 찾지 못 했습니다.');
		}

		const foundFarmId = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (parseInt(id) !== foundFarmId) {
			throw new Error('농장수정은 해당 농장주만 수정할 수 있습니다.');
		}

		if (req.files) {
			const locations = req.files.map((data) => data.location);
			url = locations.toString();
		}

		const toUpdate = {
			...(type && { type }),
			...(name && { name }),
			...(address && { address }),
			...(description && { description }),
			...(owner && { owner }),
			...(url && { url }),
		};
		const updatedFarm = await db.Farms.updateFarm(id, toUpdate);
		res.status(200).json(updatedFarm);
	} catch (err) {
		next(err);
	}
}

export async function removeFarm(req, res, next) {
	const { id } = req.params;
	const farmerId = req.farmerId;
	try {
		if (!id) {
			throw new Error('해당 농장을 찾지 못 했습니다.');
		}
		const foundFarmId = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (parseInt(id) !== foundFarmId) {
			throw new Error('농장삭제는 해당 농장주만 삭제할 수 있습니다.');
		}
		await db.Farms.remove(id);
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
}
