import e from "express";

export type {
  DbEntities,
  MySqlEntities,
  BoardColor,
  UserData,
  UserRole,
  WithoutId
} from "../../global.js";

export type RouteHandler = (req: e.Request, res: e.Response, next?: e.NextFunction) => any;