import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
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

  const token = req.headers.authorization.split("Bearer ")[1];

  verifyToken(token, async (error, decoded: JwtPayload) => {
    if (error) {
      return next(new UnauthorizedException("로그인이 필요합니다."));
    }

    const u = await User.findOne({ email: decoded.user }).select(
      "email nickname"
    );

    req.user = {
      email: u.email,
      nickname: u.nickname,
    };

    next();
  });

  // TODO: token verify
  // TODO: payload - get user info
  // TODO: user info to req.user
}
