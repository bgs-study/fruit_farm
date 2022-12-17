import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as farmController from '../controller/farm.js';

const router = express.Router();

// GET /api/farms => 모든 농장조회
// GET /api/farms?type=:type => 타입에 따른 농장조회 ex) 서비스가 커지면 농장,목장, 비닐하우스등등 체험의 타입이 늘어났을 때 타입별로 조회
router.get('/', farmController.getFarms);

// GET /api/farm/location?address=:address => 지역에 따른 농장조회 ex) 경기도, 충청남도, 부산, 서울
router.get('/location', farmController.getByLocation);

// 농장 등록하기 post
router.post('/', farmController.createFarm);

// 아래 라우터는 농장소유주 테이블을 만들고 해당 농장의 소유주를 확인하는 미들웨어를 만든 후 구현하기(미구현)

// 농장 정보 수정하기 put
//router.put('/:id', farmController.updateFarm);

// 농장 정보 삭제하기 delete
// router.delete('./:id', farmController.removeFarm);
export default router;
