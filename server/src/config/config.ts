import { z } from "zod";

if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config();
}

const configSchema = z.object({
  NODE_ENV: z.literal("development").or(z.literal("production")),
  ADMIN_EMAIL_ADDRESS: z.string(),
  ADMIN_EMAIL_APP_PASSWORD: z.string(),
  ADMIN_EMAIL_HOST: z.string(),
  ADMIN_EMAIL_PORT: z.string(),
  CLEARDB_USER: z.string(),
  CLEARDB_PASSWORD: z.string(),
  CLEARDB_HOST: z.string(),
  CLEARDB_DATABASE: z.string(),
  CLIENT_URL: z.string(),
  MONGODB_URI: z.string(),
  PORT: z.string()
});

export default configSchema.parse(process.env);