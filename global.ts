export type WithoutId<TEntity, TId extends string = "id"> = Omit<TEntity, TId>;
export type UserRole = "ADMIN" | "CAPTAIN" | "USER";
export type UserCredentials = Pick<PublicEntities.Player, "email">;
export type UserData = Pick<PublicEntities.Player, "email" | "role">;
export type BoardColor = "B" | "N";

export namespace MySqlEntities {
  export interface Player {
    /** @primaryKey */
    ffe_id: string;
    fide_id: number | null;
    email: string;
    role: UserRole;
    pwd: string;
    pwd_reset_id: string | null;
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

  export type TeamWithCaptain = Team & Player;

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
    time: string;
  }

  export interface ShortMatchInfo {
    season: number;
    round: number;
    teamName: string;
  }

  export type FullMatchInfo =
    & Pick<Match, "id" | "season" | "round" | "white_on_odds" | "date" | "time">
    & {
      team_id: Team["id"];
      team_name: Team["name"];
    }
    & {
      [K in keyof Omit<Player, "pwd" | "pwd_reset_id"> as `captain_${K}`]: Player[K]
    }
    & {
      [K in keyof Club as `opponent_${K}`]: Club[K]
    }
    & {
      [K in keyof Club as `hc_${K}`]: Club[K]
    };

  export interface LineUp {
    board: number;
    player_ffe_id: Player["ffe_id"];
    match_id: Match["id"];
    player_rating: Player["rating"];
  }
}

export namespace PublicEntities {
  export type Player = Omit<MySqlEntities.Player, "pwd" | "pwd_reset_id">;

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
    home_club: Club;
    white_on_odds: boolean;
    date: string;
    time: string;
  }

  export type LineUp = {
    board: number;
    color: BoardColor;
    player: Player | null;
  }[];
}