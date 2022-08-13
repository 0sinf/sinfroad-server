import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { ImageModule } from '../image/image.module';
import { AuthModule } from '../auth/auth.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    ImageModule,
    AuthModule,
    forwardRef(() => LikeModule),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
