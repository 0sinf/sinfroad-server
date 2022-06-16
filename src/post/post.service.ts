import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { PostReq } from './dto/post.dto';
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

  async findAll(page: number) {
    const take = 10;
    const skip = (page - 1) * take;

    const [posts, total] = await this.postRepository.findAndCount({
      take,
      skip,
    });

    const hasNext = total > take * page;

    return [posts, { page, hasNext }];
  }

  async findPost(postId: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    return post;
  }

  async createPost(
    images: Array<Express.Multer.File>,
    dto: PostReq,
  ): Promise<PostEntity> {
    const { title, contents, address } = dto;
    const urls = images.map((image) => `${this.domain}/${image.path}`);

    const p = new PostEntity();
    p.title = title;
    p.contents = contents;
    p.address = address;
    const post = await this.postRepository.save(p);

    await Promise.all(urls.map((url) => this.imageService.saveImage(p, url)));

    return post;
  }

  async updatePost(postId: string, dto: PostReq) {
    const { title, contents, address } = dto;

    const result = await this.postRepository
      .createQueryBuilder()
      .update()
      .set({ title, contents, address })
      .where('id = :id', { id: postId })
      .execute();

    this.checkResult(result.affected);
  }

  async deletePost(postId: string) {
    const result = await this.postRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: postId })
      .execute();

    this.checkResult(result.affected);
  }

  private checkResult(count: number) {
    if (count < 1) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }
  }
}
