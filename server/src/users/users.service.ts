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
    const isLogined = this.usersModel.checkUser(email, password);
    return isLogined;
  }

  async getUserInfo(userId: string) {
    const user = this.usersModel.findById(userId);
    return user;
  }

  async updateUser(userId: string, name: string, password: string) {
    throw new Error('Not implemented');
  }

  async deleteUser(userId: string) {
    throw new Error('Not implemented');
  }
}
