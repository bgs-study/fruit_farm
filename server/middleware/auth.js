import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import db from '../models/index.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!(authHeader && authHeader.startsWith('Bearer '))) {
		return res.status(401).json({
			result: AUTH_ERROR,
			message: '로그인한 유저만 사용할 수 있는 서비스입니다.',
		});
	}
	const token = authHeader.split(' ')[1];

	jwt.verify(token, config.jwt, async (error, decoded) => {
		try {
			if (error) {
				return res.status(401).json(AUTH_ERROR);
			}
			const user = await db.Users.findById(decoded.id.id);
			if (!user) {
				return res.status(401).json(AUTH_ERROR);
			}
			if (!(user.role === 'farmer')) {
				req.userId = user.id;
				req.token = token;
			}
			req.farmerId = user.id;
			req.token = token;
			next();
		} catch (err) {
			next(err);
		}
	});
};
