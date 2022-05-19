import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../error/index";
import { verifyToken } from "../utils/jwt";
import { User } from "../model";

export default async function loginRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return next(new UnauthorizedException("로그인이 필요합니다."));
  }

  const token = req.headers.authorization.split("Bearer ")[0];

  const user = verifyToken(token);
  console.log(user);
  try {
  } catch (error) {}
  // TODO: token verify
  // TODO: payload - get user info
  // TODO: user info to req.user

  return next();
}
