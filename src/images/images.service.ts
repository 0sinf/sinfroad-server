import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './image.entity';
import { PostEntity } from '../posts/posts.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  async saveImage(post: PostEntity, images: Express.Multer.File[]) {
    for (const i of images) {
      const url = `${process.env.SERVER_DOMAIN}/public/${i.filename}`;
      const image = new ImageEntity();
      image.post = post;
      image.url = url;
      await this.imageRepository.save(image);
    }
  }
}
