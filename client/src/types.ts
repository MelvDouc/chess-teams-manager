import { RoleIndex } from "@src/utils/auth.js";
import { Match as DbMatch } from "../../global.js";

export type {
  BoardColor,
  LineUpItem,
  Player,
  PlayerCredentials,
  PlayerData,
  PlayerRole
} from "../../global.js";

export type Match = Omit<DbMatch, "date"> & { _id: string; date: string; };
export type ShortMatchInfo = Pick<Match, "season" | "round" | "teamName">;
export type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: Match[];
};

export interface Route<Params = Record<string, string>> {
  getTitle: (params?: Params) => string;
  component: (params?: Params) => string | Node | Promise<string | Node>;
  minRole?: RoleIndex;
}

export type RouteInfo = {
  title: string;
  component: () => string | Node | Promise<string | Node>;
};