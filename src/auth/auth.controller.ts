import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { GoogleUser } from '../@types/user';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleRedirect() {
    // redirect google login
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request) {
    // By req.user, find or save
    const user = await this.userService.findByProviderIdOrSave(
      req.user as GoogleUser,
    );
  }
}
