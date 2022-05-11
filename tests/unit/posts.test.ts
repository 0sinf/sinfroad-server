import { Request, Response, NextFunction } from "express";
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http";
import * as postController from "../../src/controller/post";
import { Post } from "../../src/model";

let req: MockRequest<Request>, res: MockResponse<Response>, next: NextFunction;

Post.create = jest.fn();

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Post create test", () => {
  it("should be defined createPost", () => {
    expect(postController.createPost).toBeDefined();
  });
});
