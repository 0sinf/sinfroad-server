import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserReq {
  @IsString()
  @IsNotEmpty()
  name: string;
}
