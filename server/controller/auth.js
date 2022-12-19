import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';

export async function signup(req, res, next) {
	const { phoneNum, password, name, email, role } = req.body;

	try {
		const found = await db.Users.findByUserEmail(email);
		if (found) {
			throw new Error(`${email} already exists`);
		}
		const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
		const userId = await db.Users.createUser({
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
		const user = await db.Users.findByUserEmail(email);
		if (!user) {
			throw new Error('유효하지 않은 사용자 또는 비밀번호 입니다.');
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			throw new Error('유효하지 않은 사용자 또는 비밀번호 입니다.');
		}
		const token = createJwtToken(user.id);
		res.status(200).json({ token, email });
	} catch (err) {
		next(err);
	}
}

export async function me(req, res, next) {
	try {
		const user = await db.Users.findById(req.userId);
		if (!user) {
			throw new Error('사용자를 찾을 수 없습니다.');
		}
		res
			.status(200)
			.json({ email: user.email, name: user.name, phoneNum: user.phoneNum });
	} catch (err) {
		next(err);
	}
}

const createJwtToken = (id) => {
	return jwt.sign({ id }, config.jwt, {
		expiresIn: '2d',
	});
};

async function setUser(userInfoRequired, toUpdate) {
	const { userId, currentPassword } = userInfoRequired;

	let user = await db.Users.findById(userId);

	if (!user) {
		throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
	}

	// //비밀번호 일치 여부 확인
	const corretPasswordHash = user.password;
	const isPasswordCorrect = await bcrypt.compare(
		currentPassword,
		corretPasswordHash,
	);

	if (!isPasswordCorrect) {
		throw new Error(
			'현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
		);
	}

	//업데이트 시작

	//비밀번호 변경
	const { password } = toUpdate;

	if (password) {
		const newPasswordHash = await bcrypt.hash(
			password,
			config.bcrypt.saltRounds,
		);
		toUpdate.password = newPasswordHash;
	}

	user = await db.Users.updateUser({
		userId,
		update: toUpdate,
	});

	return user;
}

export async function userUpdate(req, res, next) {
	const userId = req.params.userId;
	const { name, email, password, phoneNum } = req.body;

	try {
		// body data로 부터 확인용으로 사용할 현재 비밀번호 추출함.
		const currentPassword = req.body.currentPassword;

		const userInfoRequired = { userId, currentPassword };

		const toUpdate = {
			...(name && { name }),
			...(email && { email }),
			...(password && { password }),
			...(phoneNum && { phoneNum }),
		};

		const updatedUserInfo = await setUser(userInfoRequired, toUpdate);
		res.status(200).json(updatedUserInfo);
	} catch (err) {
		next(err);
	}
}

export async function userDrop(req, res, next) {
	try {
		const userId = req.params.userId;

		const user = await db['Users'].deleteUser(userId);

		res.status(200).json({ userId: userId, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}
