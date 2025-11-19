import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
});
