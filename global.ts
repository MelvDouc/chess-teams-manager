export type PlayerRole = "ADMIN" | "CAPTAIN" | "USER";
export type LineUpRow = [player: Player | null, isCaptain?: true];

export interface Player {
  ffeId: string;
  fideId: number | null;
  email: string;
  role: PlayerRole;
  pwd: string;
  pwdResetId: string | null;
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