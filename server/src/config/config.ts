if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config();
}

const config = {
  NODE_ENV: process.env.NODE_ENV!,
  ADMIN_EMAIL_ADDRESS: process.env.ADMIN_EMAIL_ADDRESS!,
  ADMIN_EMAIL_APP_PASSWORD: process.env.ADMIN_EMAIL_APP_PASSWORD!,
  ADMIN_EMAIL_HOST: process.env.ADMIN_EMAIL_HOST!,
  ADMIN_EMAIL_PORT: process.env.ADMIN_EMAIL_PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  MONGODB_URI: process.env.MONGODB_URI!,
  PORT: +process.env.PORT!
} as const;

export default config;