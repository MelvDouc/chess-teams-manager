import { Match as DbMatch, Player as DbPlayer } from "../../global.js";

export type {
  BoardColor,
  LineUpItem,
  PlayerCredentials,
  PlayerData,
} from "../../global.js";

export type Player = Omit<DbPlayer, "pwd" | "pwdResetId" | "birthDate"> & { birthDate?: string; };
export type Match = Omit<DbMatch, "date"> & { _id: string; date: string; };
export type ShortMatchInfo = Pick<Match, "season" | "round" | "teamName">;
export type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: Match[];
};