import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
  ) {}

  async addLike(userId: string, postId: string) {
    // TODO: Check exist like
    // TODO: Check exist post
    // TODO: add like entity with postId, userId
  }

  async removeLike(userId: string, postId: string) {
    // TODO: Check exist like
    // TODO: Check exist post
    // TODO: remove like entity with postId, userId
  }
}
