import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { LikeController } from './like.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  controllers: [LikeController],
  providers: [],
})
export class LikeModule {}
