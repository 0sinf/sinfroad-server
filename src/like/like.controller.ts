import { Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AtGuard } from '../common/guards/at.guard';

@Controller()
@UseGuards(AtGuard)
export class LikeController {
  @Post('likes')
  async addLike() {
    throw new Error('Not implement');
  }

  @Delete('likes')
  async removeLike() {
    throw new Error('Not implement');
  }
}
