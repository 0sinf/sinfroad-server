import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PostEntity } from '../posts/posts.entity';

@Entity('Photo')
export class PhotoEntity {
  @PrimaryColumn()
  url: string;

  @ManyToOne(() => PostEntity, { cascade: true })
  post: PostEntity;
}
