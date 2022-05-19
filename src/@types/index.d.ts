import { UserInfo } from "./user";

declare global {
  namespace Express {
    interface Request {
      user: UserInfo;
    }
  }
}
