import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../../posts/schemas/post.schema';

@Injectable()
export class AdminOrOwnerGuard implements CanActivate {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    const postId = req.params.id;

    // admin can do anything
    if (user.role === 'admin') return true;

    // find the post to verify ownership
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // check if the current user is the owner of the post
    if (post.authorId.toString() === user.sub) {
      return true;
    }

    throw new ForbiddenException(
      'Not allowed - you are not the owner of this post',
    );
  }
}
