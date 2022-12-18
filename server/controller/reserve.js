import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "express-async-errors";
import { config } from "../config/config.js";
import db from "../models/index.js";

export async function reserve(req, res, next) {
  const { date, total_price, time, farm_id, personnel } = req.body;
  const user_id = req.userId;

  try {
    const new_reserve = await db["Reservations"].createReserve({
      date,
      total_price,
      time,
      user_id,
      farm_id,
      personnel,
    });
    res.status(201).json(new_reserve);
  } catch (err) {
    next(err);
  }
}

export async function reserveList(req, res, next) {
  try {
    const reserves = await db["Reservations"].getUsers();
    if (!reserve) {
      return res.status(404).json({ message: "예약 찾을 수 없음" });
    }

    res.status(200).json(reserves);
  } catch (err) {
    next(err);
  }
}

export async function reserveDrop(req, res, next) {
  try {
    const reserve_id = req.params.id;

    const reserve = await db["Reservations"].deleteReserve(reserve_id);

    res.status(200).json({ reserve_id: reserve_id, message: "delete !" });
  } catch (err) {
    next(err);
  }
}

async function serReserve(reserveInfo, toUpdate) {
    const {reserve_id} = reserveInfo;

    let reserve = await db["Reservations"].findByReserveId(reserve_id);
    
    if(!reserve) {
        throw new Error("해당 예약이 없습니다. 다시 한 번 확인해 주세요.");
    }

    reserve = await db["Reservations"].updateReserve({
        reserve_id,
        update: toUpdate
    });

    return reserve;


}

export async function reserveUpdate(req, res, next) {
    const reserve_id = req.params.id;
    const {date, total_price, status, time, farm_id, personnel} = req.body;
    
    try {

        const reserveInfo = {reserve_id};

        const toUpdate = {
            ...(date && {date}),
            ...(total_price && {total_price}),
            ...(status && {status}),
            ...(time && {time}),
            ...(farm_id && {farm_id}),
            ...(personnel && {personnel}),
        }

        const updateReserveInfo = await serReserve(reserveInfo, toUpdate);
        res.status(200).json(updateReserveInfo);

    } catch (err) {
        next(err);
    }
}
