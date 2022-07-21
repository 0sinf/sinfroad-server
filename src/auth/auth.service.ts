import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../@types/auth';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '14d',
      secret: process.env.JWT_SECRET,
    });

    return { accessToken, refreshToken };
  }
}
