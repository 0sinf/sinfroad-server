import { Controller, Inject } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(@Inject() private postsService: PostsService) {}

  async createPost() {}
}
