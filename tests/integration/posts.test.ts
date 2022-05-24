import path from "path";
import request from "supertest";
import mongoose from "mongoose";
import { rmSync } from "fs";
import app from "../../src/app";
import config from "../../src/config";

describe("Post integration test", () => {
  let postId: string;

  afterAll(async () => {
    await mongoose.connection.collection("posts").deleteMany({});

    rmSync(path.join(__dirname, "../../public"), {
      force: true,
      recursive: true,
    });
  });

  it("POST /api/posts", async () => {
    const response = await request(app)
      .post("/api/posts")
      .set("authorization", "Bearer " + config.token)
      .field("title", "title")
      .field("contents", "contents")
      .field("address", "seoul")
      .attach("images", path.join(__dirname, "../images/test.jpg"));

    expect(response.statusCode).toEqual(201);
    expect(response.body.postId).toBeDefined();

    postId = response.body.postId;
  });

  it("GET /api/posts", async () => {
    const response = await request(app).get("/api/posts").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.posts).toBeDefined();
  });

  it("GET /api/posts/:id", async () => {
    const response = await request(app).get(`/api/posts/${postId}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.post).toBeDefined();
  });

  it("PATCH /api/posts/:id", async () => {
    const response = await request(app).patch(`/api/posts/${postId}`).send({
      title: "updated title",
      contents: "updated contents",
      address: "updated address",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.post).toBeDefined();
    expect(response.body.post.title).toEqual("updated title");
    expect(response.body.post.contents).toEqual("updated contents");
    expect(response.body.post.address).toEqual("updated address");
  });
});
