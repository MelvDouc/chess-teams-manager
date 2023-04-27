export type PlayerCredentials = Pick<Player, "ffeId" | "pwd">;
export type PlayerData = Pick<Player, "ffeId" | "role">;
export type PlayerRole = "ADMIN" | "CAPTAIN" | "USER";
export type LineUpRow = [player: Player | null, rating: number, isCaptain?: true];

export interface Player {
  ffeId: string;
  fideId: number | null;
  email: string;
  role: PlayerRole;
  pwd: string;
  pwdResetId?: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  rating: number;
}

export interface Match {
  season: number;
  round: number;
  teamName: string;
  whiteOnOdds: boolean;
  opponent: string;
  address: string;
  date: Date;
  lineUp: LineUpRow[];
}