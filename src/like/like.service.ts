import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from './like.entity';
import { PostService } from '../post/post.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
    private postService: PostService,
  ) {}

  async addLike(userId: string, postId: string) {
    const like = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (like) {
      throw new BadRequestException();
    }

    const post = await this.postService.findPost(postId);

    if (!post) {
      throw new BadRequestException();
    }

    const newLike = new LikeEntity();
    newLike.postId = postId;
    newLike.userId = userId;

    await this.likeRepository.save(newLike);
  }

  async removeLike(userId: string, postId: string) {
    const like = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (!like) {
      throw new BadRequestException();
    }

    const post = await this.postService.findPost(postId);

    if (!post) {
      throw new BadRequestException();
    }

    await this.likeRepository.delete({ postId, userId });
  }
}
