import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';
import { ImageModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), ImageModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
