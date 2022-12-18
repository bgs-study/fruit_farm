import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

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

// signup
router.post('/signup', validateSignup, authController.signup); // 회원가입
// login
router.post('/login', validateCredential, authController.login); //로그인
// me
router.get('/me', isAuth, authController.me); //개인 회원정보 조회

router.patch("/me/:userId", isAuth,  authController.userUpdate);

router.get('/userlist', authController.totalUser); // 모든 회원 정보 조회

export default router;
