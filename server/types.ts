import { Session } from "oak_sessions";

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type WithoutId<TEntity, TId extends string = "id"> = Omit<TEntity, TId>;

export namespace MySqlEntities {
  export interface Player {
    /** @primaryKey */
    ffe_id: string;
    fide_id: number | null;
    email: string;
    phone: string | null;
    first_name: string;
    last_name: string;
    rating: number;
  }

  export interface Team {
    /** @primaryKey */
    id: number;
    name: string;
    captain_ffe_id: Player["ffe_id"];
  }

  export type TeamWithCaptain = {
    team_id: Team["id"];
    team_name: Team["name"];
  } & {
      [K in keyof Player as `captain_${K}`]: Player[K]
    };

  export interface Club {
    /** @primaryKey */
    id: number;
    name: string;
    address: string;
    phone: string | null;
    email: string | null;
  }

  export interface Match {
    /** @primaryKey */
    id: number;
    season: number;
    round: number;
    team_id: Team["id"];
    opponent_id: Club["id"];
    home_club_id: Club["id"];
    white_on_odds: 0 | 1;
    date: string;
  }

  export type FullMatchInfo =
    & Pick<Match, "id" | "season" | "round" | "white_on_odds" | "date">
    & TeamWithCaptain
    & {
      address: Club["address"];
    }
    & {
      [K in keyof Club as `opponent_${K}`]: Club[K]
    };

  export interface LineUp {
    board: number;
    player_ffe_id: Player["ffe_id"];
    match_id: Match["id"];
    player_rating: Player["rating"];
  }

  export interface User {
    /** @primaryKey */
    email: string;
    role: "ADMIN" | "CAPTAIN" | "USER";
    password: string;
    password_reset_id: string | null;
  }
}

export namespace DbEntities {
  export type Player = MySqlEntities.Player;

  export type Team = Omit<MySqlEntities.Team, "captain_ffe_id"> & {
    captain: Player;
  };

  export type Club = MySqlEntities.Club;

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

  export type User = MySqlEntities.User;
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