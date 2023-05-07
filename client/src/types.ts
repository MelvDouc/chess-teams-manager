/// <reference path="../../global.d.ts" />

export type BoardColor = ChessTeamsManager.BoardColor;
export type LineUpItem = ChessTeamsManager.LineUpItem;
export type Match = ChessTeamsManager.Match & { _id: string; };
export type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: Match[];
};
export type Player = Omit<ChessTeamsManager.Player, "pwd" | "pwdResetId">;
export type PlayerCredentials = ChessTeamsManager.PlayerCredentials;
export type PlayerData = ChessTeamsManager.PlayerData;
export type PlayerRole = ChessTeamsManager.PlayerRole;
export type ShortMatchInfo = Pick<Match, "season" | "round" | "teamName">;