import { Controller, Post } from '@nestjs/common';

@Controller('comments')
export class CommentController {
  @Post()
  async createComment() {
    throw new Error('Not Implement');
  }
}
