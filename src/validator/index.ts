import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestException } from "../error/index";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validators = {
  loginUser: loginSchema,
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
