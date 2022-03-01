import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { UserLoginRequest } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  /**
   * 회원 가입, 로그인, 회원 정보, 회원 정보 수정, 로그아웃, 회원 탈퇴
   */
  @Post()
  async createUser(@Body() dto: CreateUserRequest): Promise<string> {
    console.log(dto);
    return 'create user api';
  }

  @Post('login')
  async login(@Body() dto: UserLoginRequest): Promise<string> {
    console.log(dto);
    return 'login api';
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<string> {
    console.log(userId);
    return `get ${userId} user infomation`;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() dto: UpdateUserRequest,
  ): Promise<string> {
    console.log(dto);
    return `update ${userId} user api`;
  }

  @Post('logout')
  async logout(): Promise<string> {
    return 'logout api';
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<string> {
    console.log(userId);
    return `delete ${userId} user`;
  }
}
