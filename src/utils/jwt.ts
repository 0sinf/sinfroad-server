import { sign, verify } from "jsonwebtoken";
import { User } from "../@types/user";
import config from "../config";

export function genToken(user: User) {
  return sign({ user }, config.jwtSecret, { expiresIn: "7d" });
}
