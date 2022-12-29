import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { isFarmer } from '../middleware/farmerAuth.js';
import * as farmController from '../controller/farm.js';
import { upload } from '../middleware/s3.js';
import multer from 'multer';

const router = express.Router();

// GET /api/farms => 모든 농장조회
// GET /api/farms?type=:type => 타입에 따른 농장조회 ex) 서비스가 커지면 농장,목장, 비닐하우스등등 체험의 타입이 늘어났을 때 타입별로 조회
router.get('/', farmController.getFarms);

//GET /api/farms/ => 특정 농장의 데이터 조회 로그인한 농장주의 농장정보
router.get('/farminformation', isFarmer, farmController.getFarm);

// GET /api/farm/location? => 지역에 따른 농장조회 ex) 경기도, 충청남도, 부산, 서울
router.get('/location', farmController.getByLocation);

// 각 농장 조회하기
router.get('/:farmId', farmController.getByFarm);

// 농장 등록하기 post
router.post('/', isFarmer, upload.array('file', 4), farmController.createFarm);

// 농장 정보 수정하기 put
router.patch(
	'/:id',
	isFarmer,
	upload.array('file', 4),
	farmController.updateFarm,
);

// 농장 정보 삭제하기 delete
router.delete('/:id', isFarmer, farmController.removeFarm);
export default router;
