import { DbEntities, MySqlEntities, ShortMatchInfo, WithoutId } from "@src/types.js";

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
  return fetchFromApi<number>("/players/create", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function updatePlayer(ffe_id: DbEntities.Player["ffe_id"], data: Partial<DbEntities.Player>) {
  return fetchFromApi<SuccessResponse>(`/players/${ffe_id}/update`, {
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

export function getMatch({ season, round, teamName }: ShortMatchInfo) {
  return fetchFromApi<DbEntities.Match>(`/matches/${season}/${round}/${teamName}`);
}

export function getMatches(season: number) {
  return fetchFromApi<DbEntities.Match[]>(`/matches/${season}`);
}

export function getMatchLineUp({ season, round, teamName }: ShortMatchInfo) {
  return fetchFromApi<DbEntities.LineUp>(`/matches/${season}/${round}/${teamName}/line-up`);
}

export function createMatch(data: WithoutId<MySqlEntities.Match>) {
  return fetchFromApi<number>(`/matches/create`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function updateMatch(id: DbEntities.Match["id"], data: Partial<WithoutId<MySqlEntities.Match>>) {
  return fetchFromApi<SuccessResponse>(`/matches/${id}/update`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

// ===== ===== ===== ===== =====
// CLUBS
// ===== ===== ===== ===== =====

export function getClub(id: DbEntities.Club["id"]) {
  return fetchFromApi<DbEntities.Club>(`/clubs/${id}`);
}

export function getClubs() {
  return fetchFromApi<DbEntities.Club[]>("/clubs");
}

export function createClub(data: Omit<DbEntities.Club, "id">) {
  return fetchFromApi("/clubs/create", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function updateClub(id: DbEntities.Club["id"], data: Partial<DbEntities.Club>) {
  return fetchFromApi<SuccessResponse>(`/clubs/${id}/update`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function deleteClub(id: DbEntities.Club["id"]) {
  return fetchFromApi<SuccessResponse>(`/clubs/${id}/delete`, {
    method: "DELETE",
    headers: jsonHeaders
  });
}

// ===== ===== ===== ===== =====
// TEAMS
// ===== ===== ===== ===== =====

export function getTeam(name: string) {
  return fetchFromApi<DbEntities.Team>(`/teams/${name}`);
}

export function getTeams() {
  return fetchFromApi<DbEntities.Team[]>(`/teams`);
}

export function createTeam(data: {
  name: DbEntities.Team["name"];
  captain_ffe_id: DbEntities.Player["ffe_id"];
}) {
  return fetchFromApi("/teams/create", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function updateTeam(id: DbEntities.Team["id"], data: Partial<DbEntities.Team>) {
  return fetchFromApi<ExecuteResult>(`/teams/${id}/update`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

export function deleteTeam(id: DbEntities.Team["id"]) {
  return fetchFromApi<ExecuteResult>(`/teams/${id}/delete`, {
    method: "DELETE",
    headers: jsonHeaders
  });
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