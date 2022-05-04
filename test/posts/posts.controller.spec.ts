import { mock, instance } from 'ts-mockito';
import { PostsService } from '../../src/posts/posts.service';
import { PostsController } from '../../src/posts/posts.controller';

describe('PostsController', () => {
  let mockPostService: PostsService;
  let postsController: PostsController;

  beforeEach(() => {
    mockPostService = mock(PostsService);
    postsController = new PostsController(instance(mockPostService));
  });

  describe('PostsConroller createPost', () => {
    it('should be defined', () => {
      expect(postsController.createPost).toBeDefined();
    });
  });
});
