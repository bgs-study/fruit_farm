import express from 'express';
import 'express-async-errors';
import * as reserveController from '../controller/reserve.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/reserve', isAuth, reserveController.reserve); //예약 등록

router.get('/reservelist', reserveController.reserveList); // 모든 예약 정보 조회

router.get('/reserve/:id', isAuth, reserveController.getReserveData);

router.delete('/reserve/:id', reserveController.reserveDrop); //예약 삭제

router.put('/reserve/:id', isAuth, reserveController.reserveUpdate);

export default router;
