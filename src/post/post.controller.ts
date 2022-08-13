import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as uuid from 'uuid';
import { Request } from 'express';
import { PostReq } from './dto/post.dto';
import { PostService } from './post.service';
import { multerOptions } from '../common/options';
import { AtGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { GetUserInterceptor } from '../common/interceptors/get-user.interceptor';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getPosts(@Query('page') p: string) {
    const page = Number(p) || 1;
    const [posts, pagination] = await this.postService.findAll(page);

    return { posts, pagination };
  }

  @Get(':postId')
  @UseInterceptors(GetUserInterceptor)
  async getPost(@Req() req: Request, @Param('postId') postId: string) {
    const userId = req.user;
    console.log(userId);

    this.validatePostId(postId);

    const post = await this.postService.findPost(postId);

    return { post };
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(AtGuard, RolesGuard)
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
  @Roles('ADMIN')
  @UseGuards(AtGuard, RolesGuard)
  async updatePost(
    @Param('postId') postId: string,
    @Body(ValidationPipe) dto: PostReq,
  ) {
    this.validatePostId(postId);
    await this.postService.updatePost(postId, dto);
    return {};
  }

  @Delete(':postId')
  @Roles('ADMIN')
  @UseGuards(AtGuard, RolesGuard)
  async deletePost(@Param('postId') postId: string) {
    this.validatePostId(postId);
    await this.postService.deletePost(postId);
    return {};
  }

  private validatePostId(postId: string) {
    if (!uuid.validate(postId)) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }
  }
}
