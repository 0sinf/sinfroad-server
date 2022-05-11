import { Document, Model } from "mongoose";

export interface Post {
  title: string;
  contents: string;
  address: string;
  images: string[];
}

export interface PostDocument extends Post, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface PostModel extends Model<PostDocument> {}
