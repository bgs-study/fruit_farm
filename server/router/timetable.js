import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { isFarmer } from '../middleware/farmerAuth.js';
import * as timetableController from '../controller/timetable.js';

const router = express.Router();

// GET /timetables/owner?lastId=:lastId&limit=:limit
router.get('/owner', isFarmer, timetableController.getTimeTables);

// GET /timetables  => 일반사용자 조회
router.get('/:id', timetableController.getTimeTable);

// POST /timetables
router.post('/', isFarmer, timetableController.createTimeTable);

// PUT /timetables/:id
router.put('/:id', isFarmer, timetableController.updateTimeTable);

// DELETE /timetable/:id
router.delete('/:id', isFarmer, timetableController.removeTimeTable);
export default router;
