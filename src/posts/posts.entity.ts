import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImageEntity } from '../images/image.entity';

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

  @OneToMany(() => ImageEntity, (photo) => photo.post)
  photos: ImageEntity[];

  builder(title: string, contents: string, address: string) {
    this.title = title;
    this.contents = contents;
    this.address = address;
    return this;
  }
}
