import { instance, mock, anyOfClass, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import { ImageEntity } from '../../src/images/image.entity';
import { ImagesService } from '../../src/images/images.service';
describe('ImagesService', () => {
  let imagesService: ImagesService;
  let mockImageRepository: Repository<ImageEntity>;

  beforeEach(() => {
    mockImageRepository = mock();

    when(mockImageRepository.save(anyOfClass(ImageEntity))).thenResolve();

    imagesService = new ImagesService(instance(mockImageRepository));
  });

  it('should be defined', () => {
    expect(imagesService.save).toBeDefined();
  });
});
