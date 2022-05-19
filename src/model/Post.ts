import { Schema, model } from "mongoose";
import { PostDocument, PostModel } from "../@types/post";

import config from "../config";

const postSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
      index: true,
    },
    contents: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    address: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

postSchema.statics.findAllByPagination = async (page: number) => {
  const total = await PostModel.countDocuments();
  const { perPage } = config;
  const lastPage = Math.ceil(total / perPage);

  const posts = await PostModel.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  return [posts, { page, lastPage }];
};

const PostModel = model<PostDocument, PostModel>("Post", postSchema);

export default PostModel;
