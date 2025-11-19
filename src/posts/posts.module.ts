import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionalGuard } from 'src/common/guards/jwtOption.guard';
import { JwtUtil } from 'src/common/utils/decoder';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtOptionalGuard, JwtUtil],
  exports: [PostsService],
})
export class PostsModule {}
