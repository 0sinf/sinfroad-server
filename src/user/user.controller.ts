import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AtGuard } from '../common/guards';
import { User } from '../@types/user';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UpdateUserReq } from './dto/user.dto';

@Controller('users')
@UseGuards(AtGuard)
export class UserController {
  constructor(private userService: UserService) {}

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

  @Patch()
  async updateUserName(@Req() req: Request, @Body() { name }: UpdateUserReq) {
    const user = req.user as UserEntity;

    if (!user) {
      throw new ForbiddenException();
    }

    await this.userService.updateUserName(user.id, name);

    return {};
  }
}
