export interface Route {
  preCheck: () => Promise<boolean>;
  getParams?: (pathname: string) => Record<string, any>;
  getTitle: (params?: any) => string;
  component: (params?: any) => string | Node | Promise<string | Node>;
}

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
  lineUp: {
    board: number;
    ffeId: string;
  }[];
  date: Date;
}