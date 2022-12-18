import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "express-async-errors";
import { config } from "../config/config.js";
import db from "../models/index.js";

export async function signup(req, res, next) {
  const { phoneNum, password, name, email, role } = req.body;
  const found = await db["Users"].findByUserEmail(email);
  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await db["Users"].createUser({
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
  const user = await db["Users"].findByUserEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, email });
}

export async function me(req, res, next) {
  const user = await db["Users"].findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res
    .status(200)
    .json({ email: user.email, name: user.name, phoneNum: user.phoneNum });
}

const createJwtToken = (id) => {
  return jwt.sign({ id }, config.jwt, {
    expiresIn: "2d",
  });
};

export async function totalUser(req, res, next) {
  const users = await db["Users"].findAll();
  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(users);
}

async function setUser(userInfoRequired, toUpdate) {
  const { userId, currentPassword } = userInfoRequired;

  let user = await db["Users"].findById(userId);

  if (!user) {
    throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
  }

  // //비밀번호 일치 여부 확인
  const corretPasswordHash = user.password;
  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    corretPasswordHash
  );

  if (!isPasswordCorrect) {
    throw new Error(
      "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
    );
  }

  //업데이트 시작

  //비밀번호 변경
  const { password } = toUpdate;

  if (password) {
    const newPasswordHash = await bcrypt.hash(password, 10);
    toUpdate.password = newPasswordHash;
  }

  user = await db["Users"].updateUser({
    userId,
    update: toUpdate,
  });

  return user;
}

export async function userUpdate(req, res, next) {
  const userId = req.params.userId;
  const { name, email, password, phoneNum } = req.body;
  try {
    // body data로 부터 확인용으로 사용할 현재 비밀번호 추출함.
    const currentPassword = req.body.currentPassword;

    const userInfoRequired = { userId, currentPassword };

    const toUpdate = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password }),
      ...(phoneNum && { phoneNum }),
    };

    const updatedUserInfo = await setUser(userInfoRequired, toUpdate);
    res.status(200).json(updatedUserInfo);
  } catch (err) {
    next(err);
  }
}
