import express from 'express';
import 'express-async-errors';
import * as reviewController from '../controller/review.js';
import { isAuth } from '../middleware/auth.js';
import { isFarmer } from '../middleware/farmerAuth.js';
import { errorHandler } from '../middleware/error-handler.js';

const router = express.Router();

router.post('/review/:reserveId', isAuth, reviewController.review); //리뷰 등록

router.get('/review', isAuth, reviewController.getReviewData); // 본인 리뷰 조회

router.delete('/review/:reviewId', isAuth, reviewController.reviewDrop); //리뷰 삭제

router.patch('/review/:reviewId', isAuth, reviewController.reviewUpdate); //리뷰 수정

router.get('/review/farmer', isFarmer, reviewController.getReviewDataFarmer); //농장주가 본인 농장 후기 조회

router.delete('/review/farmer/:reviewId', isFarmer, reviewController.reviewDropFarmer); //농장주가 본인 농장 후기 삭제
export default router;
