import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReq } from './dto/create-user.dto';
import { LoginUserReq } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body(ValidationPipe) dto: CreateUserReq) {
    const user = await this.userService.createUser(dto);
    return {
      id: user.id,
    };
  }

  @Post('login')
  async loginUser(@Body(ValidationPipe) dto: LoginUserReq) {
    const token = await this.userService.loginUser(dto);
    return {
      token,
    };
  }
}
