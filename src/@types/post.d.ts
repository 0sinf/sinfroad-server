import { Document, Model } from "mongoose";

interface Pagination {
  page: number;
  lastPage: number;
}

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

export interface PostModel extends Model<PostDocument> {
  findAllByPagination: (page: number) => Promise<[PostDocument[], Pagination]>;
}
