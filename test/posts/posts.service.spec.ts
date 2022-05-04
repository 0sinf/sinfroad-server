import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mock, instance } from 'ts-mockito';
import { PostEntity } from '../../src/posts/posts.entity';
import { PostsService } from '../../src/posts/posts.service';

describe('PostsService', () => {
  let mockPostRepository: Repository<PostEntity>;
  let postsService: PostsService;

  beforeEach(() => {
    mockPostRepository = mock(getRepositoryToken(PostEntity));
    postsService = new PostsService(instance(mockPostRepository));
  });

  describe('PostsService createPost', () => {
    it('should be defined', () => {
      expect(postsService.createPost).toBeDefined();
    });
  });
});
