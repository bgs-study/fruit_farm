import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';


export async function reserve(req, res, next) {

    try {
        const {date, total_price, time, farm_id} = req.body;
    const user_id = req.userId;

    const new_reserve = await db['Reservations'].createReserve({
        date,
        total_price,
        time,
        user_id,
        farm_id,
    });
    res.status(201).json(new_reserve);
    } catch(err) {
        next(err);
    }
    
}

export async function reserveList(req, res, next) {

    try {
        const reserves = await db['Reservations'].getUsers();
        if(!reserve) {
            return res.status(404).json({message: "예약 찾을 수 없음"});
        }

        res.status(200).json(reserves);
    } catch(err) {
        next(err);
    }
}

export async function reserveDrop(req, res, next) {
    try {
        const reserve_id = req.params.id;

        const reserve = await db['Reservations'].deleteReserve(reserve_id);

        res.status(200).json({reserve_id: reserve_id, message: "delete !"});
    } catch (err) {
        next(err);
    }
}