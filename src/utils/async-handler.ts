import { Request, Response, NextFunction } from "express";

interface asyncFunction {
  (req: Request, res: Response): Promise<void>;
}

const asyncHandler =
  (asyncFunction: asyncFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFunction(req, res);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
