import { Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(private usersModel: UsersModel) {}

  async createUser(name: string, email: string, password: string) {
    const userId = await this.usersModel.create(name, email, password);
    return userId;
  }

  async login(email: string, password: string) {
    throw new Error('Not implemented');
  }

  async getUserInfo(userId: string) {
    throw new Error('Not implemented');
  }

  async updateUser(userId: string, name: string, password: string) {
    throw new Error('Not implemented');
  }

  async deleteUser(userId: string) {
    throw new Error('Not implemented');
  }
}
