import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private key: string;

  constructor() {
    this.key = process.env.JWT_SECRET;
  }

  getToken(payload: { userId: string }): string {
    const token = jwt.sign(payload, this.key, { expiresIn: '7d' });

    return token;
  }

  verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, this.key) as
        | jwt.JwtPayload
        | (string & { userId: string });
      const { userId } = payload;
      return userId;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
