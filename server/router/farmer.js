import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as farmerController from '../controller/farmer.js';
import { isFarmer } from '../middleware/farmerAuth.js';

const router = express.Router();

const validateCredential = [
	body('email').trim().normalizeEmail().isEmail().withMessage('invalid email'),
	body('password')
		.trim()
		.isLength({ min: 5 })
		.withMessage('password should be at least 5 characters'),
	validate,
];

const validateSignup = [
	...validateCredential,
	// body("phoneNum").trim().notEmpty().isMobilePhone().withMessage("phoneNum should be not empty"),
	body('name').trim().notEmpty().withMessage('username should be not empty'),
	validate,
];

// api/farmers/signup
router.post('/signup', validateSignup, farmerController.signup); // 농장주 회원가입

// login
router.post('/login', validateCredential, farmerController.login); //농장주 로그인

// api/farmers/information
router.get('/information', isFarmer, farmerController.information); //개인 회원정보 조회

// api/farmers/farmInfo
router.get('/farmInfo', isFarmer, farmerController.getfarmInfo); //농장주의 농장 정보 조회

//농장주 정보 수정
router.put('/update', isFarmer, farmerController.updateInfo);
//농장주 삭제

export default router;
