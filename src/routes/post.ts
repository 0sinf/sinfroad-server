import { Router } from "express";
import loginRequired from "../middleware/login-required";
import * as postController from "../controller/post";
import upload from "../utils/multer";
import validator from "../validator/index";

const postRouter = Router();

postRouter.post(
  "/",
  loginRequired,
  upload.array("images", 4),
  validator("createPost"),
  postController.createPost
);
postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);
postRouter.patch("/:id", loginRequired, postController.updatePost);
postRouter.delete("/:id", loginRequired, postController.deletePost);

export default postRouter;
