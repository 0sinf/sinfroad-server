import { IsNotEmpty, IsString } from 'class-validator';

export class PostReq {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  contents: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
