import { validate } from './validate.js';
import { body } from 'express-validator';

export const validateLogin = [
	body('email').trim().normalizeEmail().isEmail().withMessage('유효하지 않은 이메일 입니다.'),
	body('password')
		.trim()
		.isLength({ min: 8, max: 15})
		.withMessage('최소 8자 이상 최대 15자 까지만 가능합니다.'),
	validate,
];

export const validateSignup = [
	...validateLogin,
	body("phoneNum").trim().isLength({min:5, max: 15}).notEmpty().withMessage("phoneNum should be not empty"),
	body('name').trim().isLength({min: 2, max: 15}).notEmpty().withMessage('username should be not empty'),
	validate,
];

export const validatePassword = [
    body('password')
		.trim()
		.isLength({ min: 5 })
		.withMessage('password should be at least 5 characters'),
	validate,
]