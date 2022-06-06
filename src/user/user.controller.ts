import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserReq } from './dto/login-user.dto';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @Post()
  async login(@Body() loginUserDto: LoginUserReq) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !user.isValidPassword(password)) {
      throw new BadRequestException('아이디와 비밀번호를 확인해주세요.');
    }

    // TODO: 토큰 발급
  }
}
