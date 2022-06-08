import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { Repository } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  async saveImage(post: PostEntity, url: string) {
    const i = new ImageEntity();
    i.post = post;
    i.url = url;

    await this.imageRepository.save(i);
  }
}
