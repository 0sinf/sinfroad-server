import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Posts')
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 1000 })
  contents: string;

  @Column()
  address: string;
}
