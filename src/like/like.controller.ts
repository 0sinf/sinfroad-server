import { Body, Controller, Delete, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AtGuard } from '../common/guards/at.guard';
import { LikeReq } from './dto/like.dto';

@Controller()
@UseGuards(AtGuard)
export class LikeController {
  @Post('likes')
  async addLike(@Req() req: Request, @Body() { postId }: LikeReq) {
    const user = req.user;
    throw new Error('Not implement');
  }

  @Delete('likes')
  async removeLike(@Req() req: Request, @Body() { postId }: LikeReq) {
    const user = req.user;
    throw new Error('Not implement');
  }
}
