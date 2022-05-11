import { Router } from "express";
import postRouter from "./api/post";

const app = Router();

app.use("/posts", postRouter);

export default app;
