import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentReq {
  @IsString()
  @IsNotEmpty()
  contents: string;
}
