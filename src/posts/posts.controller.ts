import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostReq } from './dto/create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../lib/multer-options';
import { ImagesService } from '../images/images.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private imagesService: ImagesService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', null, multerOptions))
  async createPost(
    @Body() dto: CreatePostReq,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const post = await this.postsService.createPost(dto);
    await this.imagesService.saveImage(post, images);
    return;
  }
}
