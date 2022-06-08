import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { CreateUserReq } from './dto/create-user.dto';
import { LoginUserReq } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async createUser(dto: CreateUserReq): Promise<UserEntity> {
    const { email, password, passwordConfirm } = dto;

    const user = await this.findByEmail(email);

    if (user) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    if (!this.checkPassword(password, passwordConfirm)) {
      throw new BadRequestException('비밀번호를 확인하세요.');
    }

    const u = new UserEntity();
    u.email = email;
    u.password = this.getHashPassword(password);
    const result = await this.userRepository.save(u);

    return result;
  }

  private async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  private checkPassword(password: string, passwordConfirm: string) {
    return password === passwordConfirm;
  }

  private getHashPassword(password: string): string {
    const rounds = Number(process.env.BCRYPT_ROUNDS);
    return bcrypt.hashSync(password, rounds);
  }

  async loginUser(dto: LoginUserReq): Promise<string> {
    const { email, password } = dto;

    const u = await this.findByEmail(email);
    if (!u || !this.isEqualPassword(u.password, password)) {
      throw new BadRequestException('아이디나 비밀번호를 확인해주세요.');
    }

    const token = this.authService.getToken({ userId: u.id });
    return token;
  }

  private isEqualPassword(
    encryptedPassword: string,
    password: string,
  ): boolean {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
