import 'express-async-errors';
import db from '../models/index.js';

export async function review(req, res, next) {
	const { content, rating } = req.body;
	const user_id = req.userId;
	const reserve_id = req.params.reserveId;

	try {
		const reserve = await db.Reservations.findByReserveId(reserve_id, user_id);
		if (!reserve) {
			throw new Error('유저의 해당 예약 정보가 없습니다.');
		}
		if (reserve.status !== '체험완료') {
			throw new Error('체험이 완료되지 않아 리뷰를 작성할 수 없습니다.');
		}

		const isReview = await db.Reviews.findByReserveId(reserve_id);
		if(isReview) {
			throw new Error('해당 예약에 대한 리뷰가 존재합니다.')
		}

		const timeTableInfo = await db.TimeTables.getById(reserve.time_id);
		const farm_id = timeTableInfo.farmId;

		const new_review = await db.Reviews.createReview({
			content,
			farm_id,
			reserve_id,
			user_id,
			rating,
		});

		res.status(201).json(new_review);
	} catch (err) {
		next(err);
	}
}

export async function reviewDrop(req, res, next) {
	const id = req.params.reviewId;
	const userId = req.userId;

	try {
		const found = await db.Reviews.findByUserPkId(id, userId);
		if (!found) {
			throw new Error('해당 리뷰에 대한 유저의 정보는 없습니다.');
		}

		const review = await db.Reviews.deleteReview(id);

		res.status(200).json({ id: id, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}

export async function getReviewData(req, res, next) {
	const userId = req.userId;
	try {
		const farm = [];
		let result = [];
		const time = [];
		const timeInfo = [];

		const review = await db.Reviews.findByUserId(userId);

		if (!review) {
			throw new Error('유저에 대한 리뷰 내역이 없습니다.');
		}

		for (let i = 0; i < review.length; i++) {
			const data = await db.Farms.findById(review[i].farm_id);
			const timeId = await db.Reservations.findByReserveNumId(
				review[i].reserve_id,
			);
			farm.push({ id: data.id, name: data.name, type: data.type });
			time.push(timeId);
		}

		for (let i = 0; i < time.length; i++) {
			const info = await db.TimeTables.getAllWithFarmName(time[i].time_id);
			timeInfo.push({
				id: info.id,
				date: info.date,
				start_time: info.start_time,
				end_time: info.end_time,
				farmId: info.farmId,
				farmName:info.dataValues.name,
				url: info.dataValues.url
			});
		}

		for (let i = 0; i < review.length; i++) {
			result.push({
				review: review[i],
				time: timeInfo[i],
				reserveInfo: time[i],
			});
		}

		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
}

async function setReview(reviewInfo, toUpdate) {
	const { id, userId } = reviewInfo;

	let review = await db.Reviews.findByUserPkId(id, userId);

	if (!review) {
		throw new Error('해당 리뷰가 없습니다. 다시 한 번 확인해 주세요.');
	}

	review = await db.Reviews.updateReview({
		id,
		update: toUpdate,
	});

	return review;
}

export async function reviewUpdate(req, res, next) {
	const id = req.params.reviewId;
	const userId = req.userId;
	const { content, rating } = req.body;

	try {
		const reviewInfo = { id, userId };

		const toUpdate = {
			...(content && { content }),
			...(rating && { rating }),
		};

		const updateReview = await setReview(reviewInfo, toUpdate);
		res.status(200).json({ message: 'update!' });
	} catch (err) {
		next(err);
	}
}

export async function getReviewDataFarmer(req, res, next) {
	const farmerId = req.farmerId;

	try {
		const farm = await db.Farmers.getFarmIdFromFarmer(farmerId);

		const reserveInfo = [];
		if (!farm) {
			throw new Error('해당 농장주는 등록된 농장이 없습니다.');
		}
		const reviews = await db.Reviews.findByFarmId(farm);
		let totalreviews = [];
		for (let i = 0; i < reviews.length; i++) {
			const data = await db.Reservations.findByReserveNumId(
				reviews[i].reserve_id,
			);
			const timeInfo = await db.TimeTables.getById(data.time_id);
			reserveInfo.push({
				date: timeInfo.date,
				start_time: timeInfo.start_time,
				end_time: timeInfo.end_time,
				farmId: timeInfo.farmId,
				personnel: data.personnel
			});
		}

		for (let i = 0; i < reviews.length; i++) {
			totalreviews.push({ review: reviews[i], reserve: reserveInfo[i] });
		}

		res.status(200).json(totalreviews );
	} catch (err) {
		next(err);
	}
}

export async function reviewDropFarmer(req, res, next) {
	const id = req.params.reviewId;
	const farmerId = req.farmerId;

	try {
		const farmId = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (!farmId) {
			throw new Error('등록된 농장이 없습니다.');
		}
		const review = await db.Reviews.findByFarmerPkId(id, farmId);
		if (!review) {
			throw new Error('해당리뷰에 대한 권한이 없습니다.');
		}

		const found = await db.Reviews.deleteReview(id);

		res.status(200).json({ id: id, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}
