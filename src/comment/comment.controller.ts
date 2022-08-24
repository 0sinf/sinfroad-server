import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentReq } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  @Post()
  async createComment(@Body() { contents, postId }: CreateCommentReq) {
    throw new Error('Not Implement');
  }
}
