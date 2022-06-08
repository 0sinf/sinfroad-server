import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostReq } from './dto/create-post.dto';
import { PostService } from './post.service';
import multerOptions from '../utils/upload-options';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  //TODO: body(title, contents, address), images (multer)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 4, multerOptions))
  async createPost(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dto: CreatePostReq,
  ) {
    console.log(images);
    console.log(dto);
  }
}
