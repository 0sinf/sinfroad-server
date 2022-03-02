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
import { UsersService } from './users.service';
import { IUserInfo } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  /**
   * 회원 가입, 로그인, 회원 정보, 회원 정보 수정, 로그아웃, 회원 탈퇴
   */
  @Post()
  async createUser(@Body() dto: CreateUserRequest): Promise<object> {
    const { name, email, password } = dto;
    const userId = await this.usersService.createUser(name, email, password);
    return { userId };
  }

  @Post('login')
  async login(@Body() dto: UserLoginRequest): Promise<string> {
    const { email, password } = dto;
    const isLogined = await this.usersService.login(email, password);
    if (isLogined) {
      return 'login success';
    }
    return 'login failure';
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<IUserInfo> {
    return await this.usersService.getUserInfo(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() dto: UpdateUserRequest,
  ): Promise<void> {
    const { name, password } = dto;
    await this.usersService.updateUser(userId, name, password);
    return;
  }

  @Post('logout')
  async logout(): Promise<void> {
    return;
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    await this.usersService.deleteUser(userId);
    return;
  }
}
