import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
import * as Auth from '../middleware/validationOption.js';
const router = express.Router();


// signup
router.post('/signup', Auth.validateSignup, authController.signup); // 회원가입
// login
router.post('/login',Auth.validateLogin,  authController.login); //로그인
// me
router.get('/myInfo', isAuth , authController.myInfo); //개인 회원정보 조회

router.patch(
	'/myPassword/:userId',
	isAuth,
	Auth.validatePassword,
	authController.passwordUpdate
); //비밀번호 수정

router.patch(
	'/myInfo/:userId',
	isAuth,
	authController.userUpdate
); //개인 정보 수정

router.delete('/myInfo/:userId', isAuth, authController.userDrop); // 회원 삭제

export default router;
