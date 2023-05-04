export enum PlayerRole {
  ADMIN,
  CAPTAIN,
  USER
}

export type BoardColor = "B" | "N";
export type PlayerCredentials = Pick<Player, "ffeId" | "pwd">;
export type PlayerData = Pick<Player, "ffeId" | "role">;

export type LineUpItem = Pick<Player, "ffeId" | "rating"> & {
  name: string;
};

export interface Player {
  ffeId: string;
  email: string;
  role: PlayerRole;
  firstName: string;
  lastName: string;
  teams: string[];
  rating: number;
  pwd: string;
  fideId?: number;
  phone?: string;
  phone2?: string;
  birthDate?: Date;
  pwdResetId?: string;
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