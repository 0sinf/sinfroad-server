import { Router } from "express";
import asyncHandler from "../../utils/async-handler";

const postRouter = Router();

postRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    res.status(201).json({});
  })
);

export default postRouter;
