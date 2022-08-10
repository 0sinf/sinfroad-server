import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  postId: string;

  @Column()
  userId: string;
}
