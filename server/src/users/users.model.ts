import { Injectable } from '@nestjs/common';

interface IUserInfo {
  userId: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersModel {
  users: Array<IUserInfo>;

  seq: number;

  constructor() {
    this.users = [];
    this.seq = 1;
  }

  async create(name: string, email: string, password: string) {
    this.users.push({
      userId: this.seq,
      name,
      email,
      password,
    });
    this.seq += 1;

    return this.seq - 1;
  }
}
