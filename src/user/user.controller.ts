import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserReq } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserReq) {
    const user = await this.userService.createUser(dto);
    return {
      id: user.id,
    };
  }
}
