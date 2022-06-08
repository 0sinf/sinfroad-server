import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

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

  verifyToken(token: string) {
    try {
      const userId = jwt.verify(token, this.key) as jwt.JwtPayload | string;
      return { userId };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
