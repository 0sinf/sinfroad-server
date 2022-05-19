import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import { hashSync, genSaltSync } from "bcrypt";
import config from "../../src/config";

describe("user login test", () => {
  let email: string = "email@email.com";
  let password: string = "password";

  beforeAll(async () => {
    await mongoose.connection.collection("users").insertOne({
      email,
      password: hashSync(password, genSaltSync(config.genSaltRounds)),
      nickname: "nickname",
    });
  });

  afterAll(async () => {
    await mongoose.connection.collection("users").deleteMany({});
  });

  it("POST /api/users/login", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email, password });

    expect(response.statusCode).toEqual(200);
    expect(response.get("Set-Cookie")[0]).toContain("token");
  });
});
