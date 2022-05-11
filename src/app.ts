import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import pino from "pino";
import config from "./config";
import { Exception } from "response";
import { NotFoundException } from "./error";

const app = express();
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "../public")));

mongoose.connect(config.mongoUri, () => {
  logger.info("💾 DB connected");
});

app.use((req, res, next) => {
  next(new NotFoundException("404 NOT FOUND"));
});

app.use((error: Exception, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${error.message}`);
  res.json({
    statusCode: error.statusCode,
    message: error.message,
  });
});

app.listen(config.port, () => {
  logger.info(`🚀 Start App at ${config.port}`);
});
