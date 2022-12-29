import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';

export async function signup(req, res, next) {
	const { phoneNum, password, name, email, role } = req.body;

	try {
		const found = await db.Farmers.findByFarmerEmail(email);
		if (found) {
			throw new Error(`${email}는 이미 존재하는 이메일 입니다. `);
		}
		const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
		const userId = await db.Farmers.createFarmer({
			// userId = user.id
			email,
			password: hashed,
			name,
			phoneNum,
			role,
		});
		const token = createJwtToken(userId);
		res.status(201).json({ token, email });
	} catch (err) {
		next(err);
	}
}

export async function login(req, res, next) {
	const { email, password } = req.body;

	try {
		const farmer = await db.Farmers.findByFarmerEmail(email);
		if (!farmer) {
			throw new Error('유효하지 않은 농장주 또는 비밀번호 입니다.');
		}
		const role = farmer.dataValues.role;

		const isValidPassword = await bcrypt.compare(password, farmer.password);

		if (!isValidPassword) {
			throw new Error('유효하지 않은 농장주 또는 비밀번호 입니다.');
		}
		const token = createJwtToken({
			id: farmer.dataValues.id,
			role: farmer.role,
		});
		res.status(200).json({ token, email, role });
	} catch (err) {
		next(err);
	}
}

export async function information(req, res, next) {
	try {
		const farmer = await db.Farmers.findById(req.farmerId);
		if (!farmer) {
			throw new Error('해당 종장주를 찾을 수 없습니다.');
		}
		res.status(200).json({
			email: farmer.email,
			name: farmer.name,
			phoneNum: farmer.phoneNum,
		});
	} catch (err) {
		next(err);
	}
}

export async function updateInfo(req, res, next) {
	const { email, password, name, phoneNum } = req.body;
	try {
		const farmerId = req.farmerId;
		const found = await db.Farmers.findByFarmerEmail(email);
		if (found) {
			throw new Error(`${email}은 이미 존재합니다`);
		}
		const update = { email, password, name, phoneNum };
		const updated = await db.Farmers.updateFarmer(farmerId, update);
		res.status(200).json(updated);
	} catch (err) {
		next(err);
	}
}

const createJwtToken = (id) => {
	return jwt.sign({ id }, config.jwt, {
		expiresIn: '2d',
	});
};

export async function getfarmInfo(req, res, next) {
	const farmerId = req.farmerId;

	try {
		const farm = await db.Farmers.getFarmIdFromFarmer(farmerId);
		if (!farm) {
			throw new Error('농장주에게 등록된 농장이 없습니다.');
		}

		const farmInfo = await db.Farms.findById(farm);
		res.status(200).json(farmInfo);
	} catch (err) {
		next(err);
	}
}
