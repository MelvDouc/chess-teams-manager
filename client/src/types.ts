export interface Route<Params = Record<string, string>> {
  preCheck: () => Promise<boolean>;
  getTitle: (params?: Params) => string;
  component: (params?: Params) => string | Node | Promise<string | Node>;
}

export type RouteInfo<Params = Record<string, string>> = {
  title: string;
  params?: Params;
  component: Route<Params>["component"];
};

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
  _id: string;
  season: number;
  round: number;
  teamName: string;
  address: string;
  opponent: string;
  whiteOnOdds: boolean;
  lineUp: {
    board: number;
    ffeId: string;
  }[];
  date: Date;
}