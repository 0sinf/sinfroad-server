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
    //TODO: save post, image url
    console.log(post, images);
    return;
  }
}
