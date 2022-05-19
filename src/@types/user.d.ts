import { Document, Model } from "mongoose";

export interface CreateUserReq {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface UserInfo {
  email: string;
  nickname: string;
}

export interface User {
  email: string;
  password: string;
  nickname: string;
}

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<UserDocument> {}
