import { DbEntities, MatchDetail } from "@types";

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

// ===== ===== ===== ===== =====
// PLAYERS
// ===== ===== ===== ===== =====

export function getPlayer(ffe_id: DbEntities.Player["ffe_id"]) {
  return fetchFromApi<DbEntities.Player>(`/players/${ffe_id}`);
}

export function getPlayers() {
  return fetchFromApi<DbEntities.Player[]>("/players");
}

export function createPlayer(data: DbEntities.Player) {
  return fetchFromApi<ExecuteResult>("/players/create", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function updatePlayer(ffe_id: DbEntities.Player["ffe_id"], data: Partial<DbEntities.Player>) {
  return fetchFromApi<ExecuteResult>(`/players/${ffe_id}/update`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function deletePlayer(ffe_id: DbEntities.Player["ffe_id"]) {
  return fetchFromApi<SuccessResponse>(`/players/${ffe_id}/delete`, {
    method: "DELETE",
    headers: jsonHeaders
  });
}

// ===== ===== ===== ===== =====
// MATCHES
// ===== ===== ===== ===== =====

export function getMatchSeasons() {
  return fetchFromApi<number[]>("/matches/seasons");
}

export function getMatches(season: number) {
  return fetchFromApi<DbEntities.Match[]>(`/matches/${season}`);
}

export function getMatchLineUp({ season, round, teamName }: MatchDetail) {
  return fetchFromApi<DbEntities.LineUp>(`/matches/${season}/${round}/${teamName}/line-up`);
}

// ===== ===== ===== ===== =====
// TYPES
// ===== ===== ===== ===== =====

type SuccessResponse = {
  errors?: string[];
  success?: boolean;
};

type ExecuteResult = {
  affectedRows?: number;
  lastInsertId?: number;
};