import { Router } from "express";
import * as userController from "../controller/user";

const userRouter = Router();

userRouter.post("/login", userController.loginUser);

export default userRouter;
