import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contentHTML: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  authorId: string;

  @Prop()
  imageUrl?: string;

  @Prop({ default: false })
  published: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
