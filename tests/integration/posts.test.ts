import path from "path";
import request from "supertest";
import mongoose from "mongoose";
import { rmSync } from "fs";
import app from "../../src/app";

describe("Post integration test", () => {
  it("POST /api/posts", async () => {
    const response = await request(app)
      .post("/api/posts")
      .field("title", "title")
      .field("contents", "contents")
      .field("address", "seoul")
      .attach("images", path.join(__dirname, "../images/test.jpg"));

    expect(response.statusCode).toEqual(201);
    expect(response.body.postId).toBeDefined();
  });

  it("GET /api/posts", async () => {
    const response = await request(app).get("/api/posts").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.posts).toBeDefined();
  });

  afterAll(async () => {
    await mongoose.connection.collection("posts").deleteMany({});

    rmSync(path.join(__dirname, "../../public"), {
      force: true,
      recursive: true,
    });
  });
});
