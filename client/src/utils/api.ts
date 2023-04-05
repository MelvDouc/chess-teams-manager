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

const jsonHeaders = {
  "Content-Type": "application/json"
};

export const players = {
  all: () => fetchFromApi<Player[]>("/joueurs"),
  one: (ffeId: string) => fetchFromApi<Player>(`/joueurs/${ffeId}`),
  create: (player: Player) => fetchFromApi<{ success: boolean; errors?: string[]; }>("/joueurs/nouveau", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(player)
  }),
  update: (ffeId: string, updates: any) => fetchFromApi<{ success: boolean; errors?: string[]; }>(`/joueurs/${ffeId}/modifier`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(updates)
  }),
  delete: (ffeId: string) => fetchFromApi<{ success: boolean; errors?: string[]; }>(`/joueurs/${ffeId}/supprimer`, {
    method: "DELETE"
  })
};

export const matches = {
  create: (match: Match) => fetchFromApi(`/matchs/nouveau`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(match)
  }),
  update: (id: string, match: Match) => fetchFromApi(`/matchs/${id}/modifier`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(match)
  }),
  delete: (id: string) => fetchFromApi(`/matchs/supprimer`, {
    method: "DELETE",
    headers: {
      ...jsonHeaders,
      id
    }
  }),
  seasons: () => fetchFromApi<number[]>("/matchs/saisons"),
  bySeason: (season: number) => fetchFromApi<{ teamName: string; matches: Match[]; }[]>(`/matchs/par-saison?saison=${season}`),
  getLineUp: (id: string) => fetchFromApi<{
    board: number;
    color: string;
    player: Player | null;
  }[]>(`/matchs/composition/${id}`),
  updateLineUp: (id: string, lineUp: { board: number; ffeId: string; }[]) => fetchFromApi(`/matchs/composition/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(lineUp)
  })
};