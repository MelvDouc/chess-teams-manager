declare namespace ChessTeamsManager {
  type BoardColor = "B" | "N";
  type PlayerCredentials = Pick<Player, "ffeId" | "pwd">;
  type PlayerData = Pick<Player, "ffeId" | "isAdmin" | "isCaptain">;

  type LineUpItem = Pick<Player, "ffeId" | "rating"> & {
    name: string;
  };

  interface Player {
    ffeId: string;
    fideId?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone1?: string;
    phone2?: string;
    birthDate?: Date;
    rating?: number;
    teams?: string[];
    pwd: string;
    pwdResetId?: string;
    isAdmin?: boolean;
    isCaptain?: boolean;
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
    captainFfeId: Player["ffeId"] | null;
  }
}