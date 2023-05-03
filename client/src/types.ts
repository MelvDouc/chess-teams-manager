import { Match as DbMatch } from "../../global.js";

export type {
  BoardColor,
  LineUpItem,
  Player,
  PlayerCredentials,
  PlayerData,
} from "../../global.js";

export type Match = Omit<DbMatch, "date"> & { _id: string; date: string; };
export type ShortMatchInfo = Pick<Match, "season" | "round" | "teamName">;
export type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: Match[];
};