import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostReq } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(@Body() dto: CreatePostReq) {
    //TODO: Save image files by multer
    await this.postsService.createPost(dto);
    return;
  }
}
