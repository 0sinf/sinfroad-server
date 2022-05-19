import { Request, Response, NextFunction } from "express";
import { User } from "../model";
import { BadRequestException } from "../error/index";

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
      password,
      nickname,
    });

    res.status(201).json({ userId: user.id });
  } catch (error) {
    next(error);
  }
}
