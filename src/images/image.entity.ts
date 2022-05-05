import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PostEntity } from '../posts/posts.entity';

@Entity('Images')
export class ImageEntity {
  @PrimaryColumn()
  url: string;

  @ManyToOne(() => PostEntity)
  post: PostEntity;
}
