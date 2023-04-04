import { Match, Player } from "@types";

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
  all: () => fetchFromApi<Player[]>("/joueurs"),
  one: (ffeId: string) => fetchFromApi<Player>(`/joueurs/${ffeId}`),
  create: (player: Player) => fetchFromApi<{ success: boolean; errors?: string[]; }>("/joueurs/nouveau", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(player)
  }),
  update: (ffeId: string, updates: any) => fetchFromApi<{ success: boolean; errors?: string[]; }>(`/joueurs/${ffeId}/modifier`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  }),
  delete: (ffeId: string) => fetchFromApi<{ success: boolean; errors?: string[]; }>(`/joueurs/${ffeId}/supprimer`, {
    method: "DELETE"
  })
};

export const matches = {
  seasons: () => fetchFromApi<number[]>("/matchs/saisons"),
  byTeamName: (season: number) => fetchFromApi<{ teamName: string; matches: Match[]; }[]>(`/matchs/saisons/${season}`),
  lineUp: ({ season, teamName, round }: {
    season: number;
    teamName: string;
    round: number;
  }) => fetchFromApi<{
    board: number;
    color: string;
    player: Player | null;
  }[]>(`/matchs/saisons/${season}/${teamName}/composition?ronde=${round}`)
};