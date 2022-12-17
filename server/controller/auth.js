import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';

export async function signup(req, res, next) {
  const { phoneNum, password, name, email, role } = req.body;
  const found = await db['Users'].findByUserEmail(email);
  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await db['Users'].createUser({
    // userId = user.id
    email,
    password: hashed,
    name,
    phoneNum,
    role,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, email });
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await db['Users'].findByUserEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, email });
}

export async function me(req, res, next) {
  const user = await db['Users'].findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res
    .status(200)
    .json({ email: user.email, name: user.name, phoneNum: user.phoneNum });
}

const createJwtToken = (id) => {
  return jwt.sign({ id }, config.jwt, {
    expiresIn: '2d',
  });
};

export async function totalUser(req, res, next) {
  const users = await db['Users'].findAll();
  if (!users) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(users);
}

// export async function update(req, res, next) {
//   try {
//     if(is.emptyObject(req.body)) {
//       throw new Error( "headers의 Content-Type을 application/json으로 설정해주세요");
//     }

//     const userId = req.params.userId;
//     const {name, email, password, phoneNum} = req.body;

//     const currentPassword = req.body.currentPassword;

//     const userInfoRequired = { userId, currentPassword };

//     const toUpdate = {
//       ...(name && { name }),
//       ...(email && { email }),
//       ...(password && { password }),
//       ...(phoneNum && { phoneNum }),
//     };

//     const updatedUserInfo = await db['Users'].updateUser(
//       userInfoRequired,
//       toUpdate
//     );
//    res.status(200).json(updatedUserInfo);
//   } catch(err) {
//     next(err);
//   }
// }
