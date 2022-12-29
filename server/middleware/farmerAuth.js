import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import db from '../models/index.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isFarmer = async (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!(authHeader && authHeader.startsWith('Bearer '))) {
		return res.status(401).json(AUTH_ERROR);
	}
	const token = authHeader.split(' ')[1];

	jwt.verify(token, config.jwt, async (error, decoded) => {
		try {
			if (error) {
				return res.status(401).json(AUTH_ERROR);
			}
			const user = await db.Farmers.findById(decoded.id.id);
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
