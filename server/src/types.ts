import e from "express";

export type {
  DbEntities,
  MySqlEntities,
  BoardColor,
  WithoutId
} from "../../global.js";

export type RouteHandler = (req: e.Request, res: e.Response, next?: e.NextFunction) => any;

declare global {
  namespace NodeJS {
    interface Process {
      readonly NODE_ENV: "development" | "production";
      readonly ADMIN_EMAIL_ADDRESS: string;
      readonly ADMIN_EMAIL_APP_PASSWORD: string;
      readonly ADMIN_EMAIL_HOST: string;
      readonly ADMIN_EMAIL_PORT: string;
      readonly CLEARDB_USER: string;
      readonly CLEARDB_PASSWORD: string;
      readonly CLEARDB_HOST: string;
      readonly CLEARDB_DATABASE: string;
      readonly CLIENT_URL: string;
      readonly MONGODB_URI: string;
      readonly PORT: string;
    }
  }
}