import { RoleIndex } from "@src/utils/auth.js";

import {
  DbEntities,
  MySqlEntities,
  BoardColor,
  WithoutId,
  UserCredentials,
  UserData,
  UserRole
} from "../../global.js";

export type {
  DbEntities,
  MySqlEntities,
  BoardColor,
  WithoutId,
  UserCredentials,
  UserData,
  UserRole
};
export type ShortMatchInfo = MySqlEntities.ShortMatchInfo;

export interface Route<Params = Record<string, string>> {
  getTitle: (params?: Params) => string;
  component: (params?: Params) => string | Node | Promise<string | Node>;
  minRole?: RoleIndex;
}

export type RouteInfo = {
  title: string;
  component: () => string | Node | Promise<string | Node>;
};