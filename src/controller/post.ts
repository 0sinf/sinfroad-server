import { Request, Response, NextFunction } from "express";
import { PostDocument } from "../@types/post";
import config from "../config";
import { Post } from "../model";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
  } catch (error) {
    next(error);
  }
}

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = Number(req.query.page) || 1;
    const [posts, pagination] = await Post.findAllByPagination(page);

    res.status(200).json({
      posts: parsePost(posts),
      pagination,
    });
  } catch (error) {
    next(error);
  }
}

function parsePost(posts: PostDocument[]) {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    image: post.images[0],
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
}
