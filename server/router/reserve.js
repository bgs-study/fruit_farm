import express from 'express';
import 'express-async-errors';
import * as reserveController from '../controller/reserve.js';
import { isAuth } from '../middleware/auth.js';
import { isFarmer } from '../middleware/farmerAuth.js';

const router = express.Router();

router.post('/reserve', isAuth, reserveController.reserve); //예약 등록

// router.post('/reserve', isAuth, reserveController.reserve); //구현 중

router.get('/reserve', isAuth, reserveController.getReserveData); // user 예약 조회

router.get('/reserve/farmer', isFarmer, reserveController.getFarmerData); // 농장주가 본인의 예약된 농장 조회

router.delete('/reserve/:id', isAuth, reserveController.reserveDrop); // 유저의 예약 삭제

router.delete(
	'/reserve/farmer/:id',
	isFarmer,
	reserveController.reserveFarmerDrop,
); //농장주가 예약 삭제

router.patch('/reserve/:id', isAuth, reserveController.reserveUpdate); // 유저가 예약 수정

router.patch(
	'/reserve/farmer/:id',
	isFarmer,
	reserveController.reserveFarmerUpdate,
); //농장주 예약 수정


export default router;
