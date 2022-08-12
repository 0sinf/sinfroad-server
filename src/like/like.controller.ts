import { Body, Controller, Delete, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AtGuard } from '../common/guards/at.guard';
import { LikeReq } from './dto/like.dto';
import { User } from '../@types/user';
import { LikeService } from './like.service';

@Controller()
@UseGuards(AtGuard)
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('likes')
  async addLike(@Req() req: Request, @Body() { postId }: LikeReq) {
    const { id: userId } = req.user as User;

    await this.likeService.addLike(userId, postId);

    return {};
  }

  @Delete('likes')
  async removeLike(@Req() req: Request, @Body() { postId }: LikeReq) {
    const { id: userId } = req.user as User;

    await this.likeService.removeLike(userId, postId);

    return {};
  }
}
