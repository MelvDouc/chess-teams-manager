import { Match, LineUp, Player } from "@types";

async function fetchFromApi<T>(path: `/${string}`, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/v1${path}`, init);
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const players = {
  all: () => fetchFromApi<Player[]>("/joueurs")
};

export const matches = {
  seasons: () => fetchFromApi<number[]>("/matchs/saisons"),
  byTeamName: (season: number) => fetchFromApi<{ teamName: string; matches: Match[]; }[]>(`/matchs/saisons/${season}`),
  lineUp: ({ season, teamName, round }: {
    season: number;
    teamName: string;
    round: number;
  }) => fetchFromApi<LineUp>(`/matchs/saisons/${season}/${teamName}/composition?ronde=${round}`)
};