export type BoardColor = "B" | "N";
export type PlayerCredentials = Pick<Player, "ffeId" | "pwd">;
export type PlayerData = Pick<Player, "ffeId" | "role">;
export type PlayerRole = "ADMIN" | "CAPTAIN" | "USER";

export type LineUpItem = Pick<Player, "ffeId" | "rating"> & {
  name: string;
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
  city: string;
  zipCode: string;
  date: Date;
  lineUp: Record<number, LineUpItem | null>;
  captainFfeId: Player["ffeId"];
}