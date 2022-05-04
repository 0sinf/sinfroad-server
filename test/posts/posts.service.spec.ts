import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mock, instance } from 'ts-mockito';
import { Post } from '../../src/posts/posts.entity';
import { PostsService } from '../../src/posts/posts.service';

describe('PostsService', () => {
  let mockPostRepository: Repository<Post>;
  let postsService: PostsService;

  beforeEach(() => {
    mockPostRepository = mock(getRepositoryToken(Post));
    postsService = new PostsService(instance(mockPostRepository));
  });

  describe('PostsService createPost', () => {
    it('should be defined', () => {
      expect(postsService.createPost).toBeDefined();
    });
  });
});
