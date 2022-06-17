import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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

  @Column({ default: 1 })
  grade: number;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  hashedRefreshToken?: string;
}
