import { Request, Response, NextFunction } from "express";
import config from "../config";
import { Post } from "../model";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, contents, address } = req.body;

  const images = (req.files as Express.Multer.File[]).map(
    (file: Express.Multer.File) => {
      return `${config.domain}/${file.path}`;
    }
  );

  const post = await Post.create({
    title,
    contents,
    address,
    images,
  });

  res.status(201).json({ postId: post.id });
}
