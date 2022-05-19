import { Router } from "express";
import * as userController from "../controller/user";

const userRouter = Router();

userRouter.post("/login", userController.loginUser);
// userRouter.post("/signup", userController.createUser);

export default userRouter;
