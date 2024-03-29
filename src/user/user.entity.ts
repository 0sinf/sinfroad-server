import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
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
