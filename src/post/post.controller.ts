import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as uuid from 'uuid';
import { PostReq } from './dto/post.dto';
import { PostService } from './post.service';
import multerOptions from '../utils/options/upload-options';
import { AuthGuard } from '../utils/guards/auth.guard';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 4, multerOptions))
  async createPost(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body(ValidationPipe) dto: PostReq,
  ) {
    const post = await this.postService.createPost(images, dto);
    return {
      id: post.id,
    };
  }

  @Patch(':postId')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('postId') postId: string,
    @Body(ValidationPipe) dto: PostReq,
  ) {
    this.validatePostId(postId);
    await this.postService.updatePost(postId, dto);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  async deletePost(@Param('postId') postId: string) {
    this.validatePostId(postId);
    await this.postService.deletePost(postId);
  }

  private validatePostId(postId: string) {
    if (!uuid.validate(postId)) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }
  }
}
