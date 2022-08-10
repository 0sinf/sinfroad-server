import { Controller, Delete, Post } from '@nestjs/common';

@Controller()
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
