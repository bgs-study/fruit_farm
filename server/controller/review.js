import 'express-async-errors';
import db from '../models/index.js';

export async function review(req, res, next) {
	const { content, type, type_id, rating } = req.body;
	const user_id = req.userId;

	try {
		const new_review = await db.Reviews.createReview({
			content,
			type,
			type_id,
			user_id,
			rating,
		});

		res.status(201).json(new_review);
	} catch (err) {
		next(err);
	}
}

export async function reviewDrop(req, res, next) {
	const id = req.params.id;
	try {
		const review = await db.Reviews.deleteReview(id);

		res.status(200).json({ id: id, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}

export async function getReveiwData(req, res, next) {
	const id = req.params.id;
	try {
		const review = await db.Reviews.findByReviewId(id);
		res.status(200).json(review);
	} catch (err) {
		next(err);
	}
}

export async function reviewList(req, res, next) {
	try {
		const review = await db.Reviews.getReviews();
		if (!review) {
			throw new Error(
				'예약을 불러오는데 문제가 발생했습니다. 다시 한 번 확인해 주세요.',
			);
		}

		res.status(200).json(review);
	} catch (err) {
		next(err);
	}
}
