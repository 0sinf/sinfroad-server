import { Repository } from 'typeorm';
import { mock, instance, verify, anyOfClass, when } from 'ts-mockito';
import { PostEntity } from '../../src/posts/posts.entity';
import { PostsService } from '../../src/posts/posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository: Repository<PostEntity>;

  beforeEach(() => {
    postsRepository = mock();

    when(postsRepository.save(anyOfClass(PostEntity))).thenResolve();

    postsService = new PostsService(instance(postsRepository));
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
    expect(postsRepository).toBeDefined();
    expect(postsService.createPost).toBeDefined();
  });

  it('should call postsRepository.save', async () => {
    // given
    const post = {
      title: 'title',
      contents: 'contents',
      address: 'address',
    };

    // when
    await postsService.createPost(post);

    // then
    verify(postsRepository.save(anyOfClass(PostEntity))).called();
  });
});
