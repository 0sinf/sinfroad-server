import { mock, instance, verify } from 'ts-mockito';
import { PostsService } from '../../src/posts/posts.service';
import { PostsController } from '../../src/posts/posts.controller';
import { ImagesService } from '../../src/images/images.service';

describe('PostsController', () => {
  let mockPostService: PostsService;
  let mockImageService: ImagesService;
  let postsController: PostsController;

  beforeEach(() => {
    mockPostService = mock(PostsService);
    mockImageService = mock(ImagesService);

    postsController = new PostsController(
      instance(mockPostService),
      instance(mockImageService),
    );
  });

  describe('PostsConroller createPost', () => {
    it('should be defined', () => {
      expect(postsController.createPost).toBeDefined();
    });

    it('should call postsService createPost', async () => {
      const post = {
        title: 'title',
        contents: 'contents',
        address: 'address',
      };
      const images: Express.Multer.File[] = [];

      await postsController.createPost(post, images);

      verify(mockPostService.createPost(post)).called();
    });
  });
});
