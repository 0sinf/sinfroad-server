import { Request, Response, NextFunction } from "express";
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from "node-mocks-http";
import { hashSync, genSaltSync } from "bcrypt";
import * as userController from "../../src/controller/user";
import { User } from "../../src/model";
import { CreateUserReq } from "../../src/@types/user";
import { BadRequestException } from "../../src/error/index";
import config from "../../src/config";

let req: MockRequest<Request>, res: MockResponse<Response>, next: NextFunction;

User.create = jest.fn();

beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});

describe("User create test", () => {
  let user: CreateUserReq;

  beforeEach(() => {
    user = {
      email: "email@email.com",
      password: "password",
      passwordConfirm: "password",
      nickname: "nickname",
    };

    req.body = user;
  });

  it("should be defined createUser", () => {
    expect(userController.createUser).toBeDefined();
  });

  it("should be call User.create", async () => {
    await userController.createUser(req, res, next);

    expect(User.create).toBeCalledTimes(1);
  });

  it("should be equal password and passwordConfirm", async () => {
    req.body = {
      email: "email@email.com",
      password: "password",
      passwordConfirm: "passwordaa",
      nickname: "nickname",
    };

    await userController.createUser(req, res, next);

    expect(next).toBeCalledWith(
      new BadRequestException("비밀번호를 확인하세요.")
    );
  });

  it("should be returned status", async () => {
    await userController.createUser(req, res, next);

    expect(res.statusCode).toEqual(201);
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should handle error", async () => {
    const error = { message: "error" };
    const rejectedMessage = Promise.reject(error);
    User.create = jest.fn().mockReturnValue(rejectedMessage);

    await userController.createUser(req, res, next);

    expect(next).toBeCalledWith(error);
  });
});
