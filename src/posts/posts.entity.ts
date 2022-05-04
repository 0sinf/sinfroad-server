import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoEntity } from '../photos/photos.entity';

@Entity('Post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 1000 })
  contents: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => PhotoEntity, (photo) => photo.post)
  photos: PhotoEntity[];
}
