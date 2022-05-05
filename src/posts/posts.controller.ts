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
import { ImagesService } from '../images/images.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private imagesService: ImagesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async createPost(
    @Body() dto: CreatePostReq,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    //TODO: Save image files by multer
    const post = await this.postsService.createPost(dto);
    await this.imagesService.saveImage(post, images);
    return;
  }
}
