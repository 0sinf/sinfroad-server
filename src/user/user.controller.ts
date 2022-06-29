import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AtGuard } from '../common/guards';
import { User } from '../@types/user';

@Controller('users')
export class UserController {
  @Get(':userId')
  @UseGuards(AtGuard)
  async getUser(@Req() req: Request, @Param('userId') userId: string) {
    const user = req.user as User;

    if (user.id !== userId) {
      throw new UnauthorizedException();
    }

    return { user: { id: user.id, email: user.email, name: user.name } };
  }
}
