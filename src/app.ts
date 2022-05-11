import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import config from "./config";
import { Exception } from "response";
import { NotFoundException } from "./error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "../public")));

mongoose.connect(config.mongoUri, () => {
  console.log("Start DB");
});

app.use((req, res, next) => {
  next(new NotFoundException("404 NOT FOUND"));
});

app.use((err: Exception, req: Request, res: Response, next: NextFunction) => {
  res.json({
    statusCode: err.statusCode,
    message: err.message,
  });
});

app.listen(config.port, () => {
  console.log("Start App");
});
