import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity]), PostModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
