import { z } from 'zod';

// //  creating a post
export const CreatePostDto = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  contentHTML: z
    .string()
    .nonempty('Content is required')
    .min(15, 'Content must be at least 15 characters'),

  imageUrl: z.string().optional(),
});

export const UpdatePostDto = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  contentHTML: z
    .string()
    .nonempty('Content is required')
    .min(15, 'Content must be at least 15 characters'),

  imageUrl: z.string().optional(),
});

export type UpdatePostDtoType = z.infer<typeof UpdatePostDto>;
export type CreatePostDtoType = z.infer<typeof CreatePostDto>;
