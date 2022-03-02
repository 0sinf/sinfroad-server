import { Injectable } from '@nestjs/common';

export interface IUserInfo {
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

  async checkUser(email: string, password: string) {
    const user = this.users.find((user) => user.email === email);
    return user.password === password;
  }

  async findById(userId: string) {
    const user = this.users.find((user) => user.userId === parseInt(userId));
    if (!user) {
      throw new Error('Not exists user');
    }
    return user;
  }

  async findByIdAndUpdate(userId: string, name: string, password: string) {
    const user = this.users.find((user) => user.userId === parseInt(userId));
    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }
    return;
  }

  async findByIdAndDelete(userId: string) {
    const user = this.users.find((user) => {
      user.userId === parseInt(userId);
    });
    const idx = this.users.indexOf(user);
    this.users.splice(idx, 1);
  }
}
