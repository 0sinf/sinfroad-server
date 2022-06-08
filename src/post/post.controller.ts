import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostReq } from './dto/create-post.dto';
import { PostService } from './post.service';
import multerOptions from '../utils/options/upload-options';
import { AuthGuard } from '../utils/guards/auth.guard';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 4, multerOptions))
  async createPost(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dto: CreatePostReq,
  ) {
    const post = await this.postService.createPost(images, dto);
    return {
      id: post.id,
    };
  }
}
