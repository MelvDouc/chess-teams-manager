import e from "express";

export type {
  LineUpRow,
  Match,
  Player,
  PlayerRole
} from "../../global.js";

export type RouteHandler = (req: e.Request, res: e.Response, next?: e.NextFunction) => any;