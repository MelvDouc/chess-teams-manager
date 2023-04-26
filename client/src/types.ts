import { DbEntities, MySqlEntities, BoardColor, WithoutId } from "../../global.js";

export type { DbEntities, BoardColor, WithoutId };
export type ShortMatchInfo = MySqlEntities.ShortMatchInfo;

export interface Route<Params = Record<string, string>> {
  preCheck: () => Promise<boolean>;
  getTitle: (params?: Params) => string;
  component: (params?: Params) => string | Node | Promise<string | Node>;
}

export type RouteInfo = {
  title: string;
  component: () => string | Node | Promise<string | Node>;
};