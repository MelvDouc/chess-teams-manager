import { RoleIndex } from "@src/utils/auth.js";
import { Match } from "../../global.js";

export type {
  BoardColor,
  LineUpRow,
  Player,
  PlayerCredentials,
  PlayerData,
  PlayerRole
} from "../../global.js";

export type { Match };
export type ShortMatchInfo = Pick<Match, "season" | "round" | "teamName">;

export interface Route<Params = Record<string, string>> {
  getTitle: (params?: Params) => string;
  component: (params?: Params) => string | Node | Promise<string | Node>;
  minRole?: RoleIndex;
}

export type RouteInfo = {
  title: string;
  component: () => string | Node | Promise<string | Node>;
};