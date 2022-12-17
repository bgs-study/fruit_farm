import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';
import Farms from '../models/farm.js';

// 서비스가 확장되어 타입이 늘어나면 ex (딸기, 수박, 파인애플 등등) 특정타입을 받아 특정타입의 농장을 조회
export async function getFarms(req, res, next) {
  const { type } = req.query;
  console.log(type);
  const data = await (type
    ? db['Farms'].getByType(type)
    : db['Farms'].getAll());
  res.status(200).json(data);
}

export async function createFarm(req, res, next) {
  const { type, name, address, description, owner } = req.body;
  const farm = await db['Farms'].createFarm({
    type,
    name,
    address,
    description,
    owner,
  });
  res.status(201).json(farm);
}
