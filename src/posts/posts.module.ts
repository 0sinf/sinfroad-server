import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';
import { ImagesService } from '../images/images.service';
import { ImageEntity } from '../images/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ImageEntity])],
  controllers: [PostsController],
  providers: [PostsService, ImagesService],
})
export class PostsModule {}
