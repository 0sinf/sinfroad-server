import { Request, Response, NextFunction } from "express";
import { User } from "../model";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, passwordConfirm, nickname } = req.body;
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
