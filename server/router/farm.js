import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as farmController from '../controller/farm.js';

const router = express.Router();

// GET /api/farms => 모든 농장조회
// GET /api/farms?type=:type => 타입에 따른 농장조회
router.get('/', farmController.getFarms);

// 농장 등록하기 post
router.post('/', farmController.createFarm);
// 농장 정보 수정하기 put

// 농장 정보 삭제하기 delete

export default router;
