import { IsString, IsUUID } from 'class-validator';

export class CreateCommentReq {
  @IsString()
  contents: string;

  @IsUUID()
  postId: string;
}
