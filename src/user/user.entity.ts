import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column({ default: 'GEUST' })
  role: string;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
