import "https://deno.land/std@0.181.0/dotenv/load.ts";

const config = Deno.env.toObject() as Readonly<{
  DENO_ENV: "development" | "production";
  ADMIN_EMAIL_ADDRESS: string;
  ADMIN_EMAIL_APP_PASSWORD: string;
  ADMIN_EMAIL_HOST: string;
  ADMIN_EMAIL_PORT: string;
  CLEARDB_USER: string;
  CLEARDB_PASSWORD: string;
  CLEARDB_HOST: string;
  CLEARDB_DATABASE: string;
  CLIENT_URL: string;
  MONGODB_URI: string;
  PORT: string;
}>;

export default config;