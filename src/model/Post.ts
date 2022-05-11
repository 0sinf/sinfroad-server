import { Schema, model } from "mongoose";
import { PostDocument, PostModel } from "post";

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

const PostModel = model<PostDocument, PostModel>("Post", postSchema);

export default PostModel;
