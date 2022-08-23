import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  contents: string;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
