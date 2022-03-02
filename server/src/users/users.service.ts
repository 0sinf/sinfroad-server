import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async createUser(name: string, email: string, password: string) {
    throw new Error('Not implemented');
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
