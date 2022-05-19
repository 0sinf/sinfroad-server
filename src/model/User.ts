import { model, Schema } from "mongoose";
import { UserDocument, UserModel } from "../@types/user";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model<UserDocument, UserModel>("User", UserSchema);

export default UserModel;
