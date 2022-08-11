import { IsUUID, IsNotEmpty } from 'class-validator';

export class LikeReq {
  @IsUUID()
  @IsNotEmpty()
  postId: string;
}
