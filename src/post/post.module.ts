import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), ImageModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
