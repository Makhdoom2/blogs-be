import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  create(data) {
    return this.model.create(data);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findAll(options: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isBlocked?: boolean;
  }) {
    const limit = Math.min(options?.limit ?? 10, 50);
    const page = Math.max(options?.page ?? 1, 1);
    const skip = (page - 1) * limit;

    const filter: any = {};

    // search by name or email
    if (options?.search) {
      filter.$or = [
        { name: { $regex: options.search, $options: 'i' } },
        { email: { $regex: options.search, $options: 'i' } },
      ];
    }

    // filter by role
    if (options?.role) filter.role = options.role;

    // filter by isBlocked
    if (options?.isBlocked !== undefined) filter.isBlocked = options.isBlocked;

    const [users, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.model.countDocuments(filter),
    ]);

    return {
      total,
      page,
      limit,
      users,
    };
  }

  toggleBlock(id: string) {
    return this.model.findByIdAndUpdate(
      id,
      [{ $set: { isBlocked: { $not: '$isBlocked' } } }],
      { new: true },
    );
  }
}
