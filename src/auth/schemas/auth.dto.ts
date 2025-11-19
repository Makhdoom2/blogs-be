import { z } from 'zod';

export const RegisterDto = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .min(3, 'Name must be at least 3 characters'),

  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),

  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).+$/,
      'Password must contain uppercase, lowercase, number, and special character',
    ),
  role: z.enum(['user', 'admin']).default('user'),
});

export const LoginDto = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),

  password: z.string().nonempty('Password is required'),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;
export type LoginDtoType = z.infer<typeof LoginDto>;
