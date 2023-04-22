import { Session } from "oak_sessions";

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export namespace DbEntities {
  export interface Player {
    ffe_id: string;
    fide_id: number | null;
    email: string;
    phone: string | null;
    first_name: string;
    last_name: string;
    rating: number;
  }

  export interface Team {
    id: number;
    name: string;
    captain: Player;
  }

  export interface Club {
    id: number;
    name: string;
    address: string;
    phone: string | null;
    email: string | null;
  }

  export interface Match {
    id: number;
    season: number;
    round: number;
    team: Team;
    opponent: Club;
    address: Club["address"];
    white_on_odds: boolean;
    date: Date;
  }

  export type LineUp = {
    board: number;
    color: BoardColor;
    player: Player | null;
  }[];

  export interface User {
    email: string;
    role: "ADMIN" | "CAPTAIN" | "USER";
    password: string;
    password_reset_id: string | null;
  }
}

export type BoardColor = "B" | "N";

export type AppState = {
  session: Session;
};

export interface FormValidator<T extends {}> {
  key: keyof T;
  validate: (value: unknown) => boolean | Promise<boolean>;
  error: string;
}