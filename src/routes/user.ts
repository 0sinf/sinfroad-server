import { Router } from "express";
import * as userController from "../controller/user";
import validator from "../validator/index";

const userRouter = Router();

userRouter.post("/login", validator("loginUser"), userController.loginUser);
// userRouter.post("/signup", userController.createUser);

export default userRouter;
