import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from './user.entity';
import { GoogleUser } from '../@types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByProviderIdOrSave(googleUser: GoogleUser) {
    const { providerId, provider, email, name } = googleUser;

    const user = await this.userRepository.findOne({ where: { providerId } });

    if (user) {
      return user;
    }

    const newUser = new UserEntity();
    newUser.provider = provider;
    newUser.providerId = providerId;
    newUser.email = email;
    newUser.name = name;

    return await this.userRepository.save(newUser);
  }

  async updateHashedRefreshToken(userId: string, token: string) {
    const hashedToken = await argon2.hash(token);

    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ hashedRefreshToken: hashedToken })
      .where('id=:id', { id: userId })
      .execute();
  }

  async findByIdAndCheckRT(userId: string, token: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException();
    }

    const isHashed = await argon2.verify(user.hashedRefreshToken, token);

    if (!isHashed) {
      throw new BadRequestException();
    }

    return user;
  }
}
