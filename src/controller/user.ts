import { Request, Response, NextFunction } from "express";
import { User } from "../model";
import { BadRequestException } from "../error/index";
import { genSaltSync, hashSync } from "bcrypt";
import config from "../config";

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
