import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
