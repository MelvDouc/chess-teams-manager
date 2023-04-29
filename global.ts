export type BoardColor = "B" | "N";
export type PlayerCredentials = Pick<Player, "ffeId" | "pwd">;
export type PlayerData = Pick<Player, "ffeId" | "role">;
export type PlayerRole = "ADMIN" | "CAPTAIN" | "USER";

export type LineUpItem = {
  ffeId: Player["ffeId"] | null;
  rating: number | null;
};

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
  lineUp: Record<number, LineUpItem>;
  captainFfeId: Player["ffeId"];
}