import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { ImageEntity } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ImageEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
