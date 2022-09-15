import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity]),
    forwardRef(() => PostModule),
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
