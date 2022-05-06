import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostReq } from './dto/create-post.dto';
import { PostEntity } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async createPost(dto: CreatePostReq) {
    const { title, contents, address } = dto;
    const post = new PostEntity().builder(title, contents, address);
    return await this.postsRepository.save(post);
  }

  async getPost(postId: string) {
    if (!this.isUuid(postId)) {
      throw new BadRequestException('올바르지 않은 접근입니다.');
    }

    const post = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.images', 'image')
      .where('id = :id', { id: postId })
      .getOne();

    if (!post) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    return post;
  }

  private isUuid(postId: string): boolean {
    return !!postId.match(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    );
  }

  async getPosts() {
    const posts = await this.postsRepository.find();
    return posts;
  }
}
