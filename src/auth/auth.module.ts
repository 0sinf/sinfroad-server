import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './stratgies/google.strategy';
import { RtStrategy } from './stratgies/refresh.strategy';
import { AtStrategy } from './stratgies/access.strategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, RtStrategy, AtStrategy],
})
export class AuthModule {}
