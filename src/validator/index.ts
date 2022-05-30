import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestException } from "../error/index";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const PostSchema = Joi.object({
  title: Joi.string().required().min(2),
  contents: Joi.string().required().min(2),
  address: Joi.string().required(),
});

const validators = {
  loginUser: loginSchema,
  createPost: PostSchema,
  updatePost: PostSchema,
};

export default function validator(schema: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await validators[schema].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      next(new BadRequestException("잘못된 요청입니다."));
    }
  };
}
