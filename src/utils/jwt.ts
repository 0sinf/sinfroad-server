import { sign, verify, VerifyCallback } from "jsonwebtoken";
import { User } from "../@types/user";
import config from "../config";

export function genToken(user: User) {
  return sign({ user: user.email }, config.jwtSecret, { expiresIn: "7d" });
}

export function verifyToken(token: string, cb: VerifyCallback) {
  return verify(token, config.jwtSecret, cb);
}
