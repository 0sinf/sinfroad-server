import {
  Controller,
  ForbiddenException,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AtGuard } from '../common/guards';
import { User } from '../@types/user';

@Controller('users')
@UseGuards(AtGuard)
export class UserController {
  @Get()
  async getUser(@Req() req: Request) {
    const user = req.user as User;

    if (!user) {
      throw new ForbiddenException();
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
