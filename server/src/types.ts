/// <reference path="../../global.d.ts" />

import e from "express";

export type {
  DeleteResult,
  InsertOneResult,
  UpdateResult,
  WithId,
  WithoutId
} from "mongodb";

export type LineUpRow = ChessTeamsManager.LineUpItem;
export type Match = ChessTeamsManager.Match;
export type Player = ChessTeamsManager.Player;
export type PlayerCredentials = ChessTeamsManager.PlayerCredentials;
export type PlayerData = ChessTeamsManager.PlayerData;

export type UpdateFilter<T> = {
  $set?: Partial<T>;
  $unset?: {
    [K in keyof T]?: "";
  };
};
export type RouteHandler = (req: e.Request, res: e.Response, next?: e.NextFunction) => any;