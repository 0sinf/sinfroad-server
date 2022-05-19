import { Router } from "express";
import loginRequired from "../middleware/login-required";
import * as postController from "../controller/post";
import upload from "../utils/multer";

const postRouter = Router();

postRouter.post(
  "/",
  loginRequired,
  upload.array("images", 4),
  postController.createPost
);
postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);

export default postRouter;
