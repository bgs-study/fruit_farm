import express from 'express';
import 'express-async-errors';
import * as likeFarmsController from '../controller/likeFarms.js';
import { isAuth } from '../middleware/auth.js';
import { errorHandler } from '../middleware/error-handler.js';

const router = express.Router();

router.post('/like/:farmId', isAuth, likeFarmsController.like); //찜 등록

router.get('/like', isAuth, likeFarmsController.getLikeData); // 본인 찜 조회

router.delete('/like/:farmId', isAuth, likeFarmsController.likecancel); //찜 삭제

export default router;
