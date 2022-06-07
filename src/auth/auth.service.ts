import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private key: string;
  constructor() {
    this.key = process.env.JWT_SECRET;
  }

  getToken(payload: string): string {
    const token = jwt.sign(payload, this.key);
    return token;
  }
}
