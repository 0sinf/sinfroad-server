import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostReq } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../lib/multer-options';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async createPost(
    @Body() dto: CreatePostReq,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    //TODO: Save image files by multer
    await this.postsService.createPost(dto);
    console.log(images);
    return;
  }
}
