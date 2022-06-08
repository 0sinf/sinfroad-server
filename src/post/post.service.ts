import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostReq } from './dto/create-post.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class PostService {
  private domain: string;

  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private imageService: ImageService,
  ) {
    this.domain = process.env.DOMAIN;
  }

  async createPost(
    images: Array<Express.Multer.File>,
    dto: CreatePostReq,
  ): Promise<PostEntity> {
    const { title, contents, address } = dto;
    const urls = images.map((image) => `${this.domain}/${image.path}`);

    const p = new PostEntity();
    p.title = title;
    p.contents = contents;
    p.address = address;
    const post = await this.postRepository.save(p);

    urls.forEach((url) => {
      this.imageService.saveImage(p, url);
    });

    return post;
  }
}
