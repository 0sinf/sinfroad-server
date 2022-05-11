import { Router } from "express";
import { Post } from "../../model";

const postRouter = Router();

postRouter.post("/", (req, res) => {
  res.status(201).json({});
});

export default postRouter;
