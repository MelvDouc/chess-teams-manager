import e from "express";
import { SqlRecord } from "./database/query-builder-factory.js";

export type {
  PublicEntities,
  MySqlEntities,
  BoardColor,
  UserData,
  UserRole,
  WithoutId
} from "../../global.js";

export type { SqlRecord };
export type RouteHandler = (req: e.Request, res: e.Response, next?: e.NextFunction) => any;