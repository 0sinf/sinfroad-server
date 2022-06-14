import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserReq {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
