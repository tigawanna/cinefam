import { z } from "zod";

const clientEnvSchema = z.object({
  VITE_API_URL: z.string().default("http://localhost:3072"),
});

export const clientEnv = clientEnvSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
});
