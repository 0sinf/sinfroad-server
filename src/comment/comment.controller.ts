import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCommentReq } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { AtGuard } from '../common/guards/at.guard';
import { UserEntity } from '../user/user.entity';
import { GetUserInterceptor } from 'src/common/interceptors/get-user.interceptor';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @UseInterceptors(GetUserInterceptor)
  async getComments(@Req() req: Request) {
    // TODO: Get postId, userId, page
    const userId = req.user && String(req.user);
    throw new Error('Not Implement');
  }

  @Post()
  @UseGuards(AtGuard)
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
  @UseGuards(AtGuard)
  async deleteComment(@Req() req: Request, @Param('id') commentId: string) {
    const user = req.user as UserEntity;

    await this.commentService.deleteComment(user, commentId);

    return {};
  }
}
