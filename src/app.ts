import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import pino from "pino";
import config from "./config";
import { Exception } from "response";
import { NotFoundException } from "./error";
import postRouter from "./routes/post";

const app = express();
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api/posts", postRouter);

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
    name: error.name,
    message: error.message,
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    logger.info(`🚀 Start App at ${config.port}`);
  });
}

export default app;
