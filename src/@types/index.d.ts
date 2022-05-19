import { UserInfo } from "./user";

declare namespace Express {
  interface Request {
    user: UserInfo;
  }
}
