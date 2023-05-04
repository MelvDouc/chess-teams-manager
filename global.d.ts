declare namespace ChessTeamsManager {
  type BoardColor = "B" | "N";
  type PlayerCredentials = Pick<Player, "ffeId" | "pwd">;
  type PlayerData = Pick<Player, "ffeId" | "role">;

  type LineUpItem = Pick<Player, "ffeId" | "rating"> & {
    name: string;
  };

  interface Player {
    ffeId: string;
    email: string;
    role: number;
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

  interface Match {
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
}