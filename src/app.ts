import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import config from "./config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "../public")));

mongoose.connect(config.mongoUri, () => {
  console.log("Start DB");
});

app.listen(config.port, () => {
  console.log("Start App");
});
