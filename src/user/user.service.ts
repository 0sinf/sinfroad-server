import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { CreateUserReq } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserReq) {
    const { email, password, passwordConfirm } = dto;

    const user = await this.findByEmail(email);

    if (user) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    if (!this.isEqualPassword(password, passwordConfirm)) {
      throw new BadRequestException('비밀번호를 확인하세요.');
    }

    const u = new UserEntity();
    u.email = email;
    u.password = this.getHashPassword(password);
    const result = await this.userRepository.save(u);

    return result;
  }

  private async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  private isEqualPassword(password: string, passwordConfirm: string) {
    return password === passwordConfirm;
  }

  private getHashPassword(password: string) {
    const rounds = Number(process.env.BCRYPT_ROUNDS);
    return bcrypt.hashSync(password, rounds);
  }
}
