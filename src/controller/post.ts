import { Request, Response, NextFunction } from "express";
import { Post } from "../model";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.json({});
}
