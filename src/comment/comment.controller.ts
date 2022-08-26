import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCommentReq } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { AtGuard } from '../common/guards/at.guard';
import { UserEntity } from '../user/user.entity';
import { GetUserInterceptor } from '../common/interceptors/get-user.interceptor';
import { UpdateCommentReq } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @UseInterceptors(GetUserInterceptor)
  async getComments(
    @Req() req: Request,
    @Query('postId') postId: string,
    @Query('page') p?: string,
  ) {
    const userId = req.user && String(req.user);
    const page = Number(p) || 1;

    const [comments, pagination] = await this.commentService.getComments(
      postId,
      userId,
      page,
    );

    return { comments, pagination };
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

  @Put(':id')
  @UseGuards()
  async updateComment(
    @Req() req: Request,
    @Param('id') commentId: string,
    @Body() { contents }: UpdateCommentReq,
  ) {
    const user = req.user as UserEntity;

    const comment = await this.commentService.updateComment(
      user,
      commentId,
      contents,
    );

    return { comment };
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  async deleteComment(@Req() req: Request, @Param('id') commentId: string) {
    const user = req.user as UserEntity;

    await this.commentService.deleteComment(user, commentId);

    return {};
  }
}
