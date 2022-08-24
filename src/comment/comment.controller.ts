import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCommentReq } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { AtGuard } from '../common/guards/at.guard';
import { UserEntity } from '../user/user.entity';

@Controller('comments')
@UseGuards(AtGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async createComment(
    @Req() req: Request,
    @Body() { contents, postId }: CreateCommentReq,
  ) {
    const user = req.user as UserEntity;

    const comment = await this.commentService.createComment(
      user,
      postId,
      contents,
    );

    return { id: comment.id };
  }

  @Delete(':id')
  async deleteComment(@Req() req: Request, @Param('id') commentId: string) {
    const user = req.user as UserEntity;

    await this.commentService.deleteComment(user, commentId);

    throw new Error('Not Implement');
  }
}
