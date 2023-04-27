import e from "express";

export type {
  DeleteResult,
  InsertOneResult,
  UpdateFilter,
  UpdateResult,
  WithId,
  WithoutId
} from "mongodb";
export type {
  LineUpRow,
  Match,
  Player,
  PlayerRole
} from "../../global.js";

export type RouteHandler = (req: e.Request, res: e.Response, next?: e.NextFunction) => any;