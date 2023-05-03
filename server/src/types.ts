import e from "express";

export type {
  DeleteResult,
  InsertOneResult,
  UpdateResult,
  WithId,
  WithoutId
} from "mongodb";
export type {
  LineUpItem as LineUpRow,
  Match,
  Player,
  PlayerCredentials,
  PlayerData,
} from "../../global.js";
export { PlayerRole } from "../../global.js";

export type UpdateFilter<T> = {
  $set?: Partial<T>;
  $unset?: {
    [K in keyof T]?: "";
  };
};
export type RouteHandler = (req: e.Request, res: e.Response, next?: e.NextFunction) => any;