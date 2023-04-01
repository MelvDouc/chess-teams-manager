import { Session } from "oak_sessions";

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export namespace DbEntities {
  export interface Player {
    ffeId: string;
    fideId: number | null;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    rating?: number;
  }

  export interface Match {
    season: number;
    round: number;
    teamName: string;
    address: string;
    opponent: string;
    whiteOnOdds: boolean;
    playerFfeIds: Record<number, Player["ffeId"]>;
    date: Date;
  }

  export interface User {
    email: string;
    role: number;
    password: string;
    passwordResetId?: string;
  }
}

export type AppState = {
  session: Session;
};

export interface FormValidator<T extends {}> {
  key: keyof T;
  validate: (value: unknown) => boolean | Promise<boolean>;
  error: string;
}