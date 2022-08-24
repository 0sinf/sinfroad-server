import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentReq } from './dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async createComment(@Body() { contents, postId }: CreateCommentReq) {
    // TODO: Get Post, User
    // TODO: Create Comment
    throw new Error('Not Implement');
  }
}
