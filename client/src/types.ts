import { }

export interface Route<Params = Record<string, string>> {
  preCheck: () => Promise<boolean>;
  getTitle: (params?: Params) => string;
  component: (params?: Params) => string | Node | Promise<string | Node>;
}

export type RouteInfo = {
  title: string;
  component: () => string | Node | Promise<string | Node>;
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
    color: "B" | "N";
    player: Player | null;
  }[];

  export interface User {
    email: string;
    role: "ADMIN" | "CAPTAIN" | "USER";
    password: string;
    password_reset_id: string | null;
  }
}

export interface MatchDetail {
  season: number;
  round: number;
  teamName: string;
}