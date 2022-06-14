import {
  Body,
  Controller,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReq } from './dto/create-user.dto';
import { LoginUserReq } from './dto/login-user.dto';
import { HttpExceptionFilter } from '../utils/filters/http-exception-filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)
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
