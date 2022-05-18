import { Router } from "express";
import * as postController from "../controller/post";
import upload from "../utils/multer";
import checkPermission from "../middleware/check-permission";

const postRouter = Router();

postRouter.post(
  "/",
  checkPermission,
  upload.array("images", 4),
  postController.createPost
);
postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);

export default postRouter;
