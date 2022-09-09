import { IsNotEmpty, IsString } from 'class-validator';

export class FixNicknameReq {
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
