import { Request, Response, NextFunction } from "express";
import { User } from "../model";
import { BadRequestException, UnauthorizedException } from "../error/index";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import config from "../config";
import { genToken } from "../utils/jwt";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, passwordConfirm, nickname } = req.body;

    if (password !== passwordConfirm) {
      throw new BadRequestException("비밀번호를 확인하세요.");
    }

    const user = await User.create({
      email,
      password: generateHashPassword(password),
      nickname,
    });

    res.status(201).json({ userId: user.id });
  } catch (error) {
    next(error);
  }
}

function generateHashPassword(password: string) {
  return hashSync(password, genSaltSync(config.genSaltRounds));
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !isEqualPassword(password, user.password)) {
      throw new BadRequestException("아이디와 비밀번호가 맞지 않습니다.");
    }

    const token = genToken(user);
    res.cookie("token", token, {
      maxAge: config.COOKIE_MAX_AGE,
    });

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
}

function isEqualPassword(password: string, hashedPassword: string) {
  return compareSync(password, hashedPassword);
}
