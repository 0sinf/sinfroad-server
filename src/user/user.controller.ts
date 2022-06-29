import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AtGuard } from 'src/common/guards';

@Controller('users')
export class UserController {
  @Get(':userId')
  @UseGuards(AtGuard)
  async getUser(@Req() req: Request, @Param('userId') userId: string) {}
}
