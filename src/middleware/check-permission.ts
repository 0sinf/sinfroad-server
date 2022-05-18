import { Request, Response, NextFunction } from "express";
import config from "../config";
import { UnauthorizedException } from "../error/index";

export default function checkPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const secretKeyInRequest = req.headers.authorization?.split("Bearer ")[1];
  const { secretKey } = config;

  if (secretKeyInRequest !== secretKey) {
    return next(new UnauthorizedException("권한이 없습니다."));
  }

  next();
}
