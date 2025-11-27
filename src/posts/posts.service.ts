import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private model: Model<Post>) {}

  async getAll(options: {
    page?: number;
    limit?: number;
    search?: string;
    isAdmin?: boolean;
  }) {
    const limit = Math.min(options?.limit ?? 10, 50);
    const page = Math.max(options?.page ?? 1, 1);
    const skip = (page - 1) * limit;

    const filter: any = {};

    // search filter
    if (options.search) {
      filter.title = { $regex: options.search, $options: 'i' };
    }

    // only admin can see unpublished
    if (!options.isAdmin) {
      filter.published = true;
    }

    const [posts, total] = await Promise.all([
      this.model
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('authorId', 'name email'),
      this.model.countDocuments(filter),
    ]);

    const formattedPosts = posts.map((post) => {
      const obj = post.toObject();
      return {
        ...obj,
        author: obj.authorId,
        authorId: undefined,
      };
    });
    return {
      total,
      page,
      limit,
      posts: formattedPosts,
    };
  }

  async getOne(isAdmin: boolean, id: string) {
    const post = await this.model
      .findById(id)
      .populate('authorId', 'name email');

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (!isAdmin && !post.published) {
      throw new ForbiddenException(
        'This post is not accessible at the moment.',
      );
    }

    const authorId = (post.authorId as any)._id;

    const formattedPost = {
      ...post.toObject(),
      author: post.authorId,
      authorId: undefined,
    };

    return formattedPost;

    // return post;
  }

  create(authorId: string, dto) {
    return this.model.create({ ...dto, authorId });
  }

  update(id: string, dto) {
    // console.log('updating post with ID:', id, 'with data:', dto);
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async togglePublish(id: string) {
    const post = await this.model.findById(id);
    if (!post) throw new Error('Post not found');

    post.published = !post.published;
    return post.save();
  }
}
