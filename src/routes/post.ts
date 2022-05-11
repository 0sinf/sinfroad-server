import { Router } from "express";
import * as postController from "../controller/post";

const postRouter = Router();

postRouter.post("/", postController.createPost);

export default postRouter;
