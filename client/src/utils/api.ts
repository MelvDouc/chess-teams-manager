import auth from "./auth.js";
import {
  PublicEntities,
  MySqlEntities,
  ShortMatchInfo,
  UserCredentials,
  UserData,
  WithoutId
} from "@src/types.js";

const jsonHeaders = {
  "Content-Type": "application/json"
};

async function fetchFromApi<T>(path: Path, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/v1${path}`, init);
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function get<TData>(path: Path) {
  return fetchFromApi<TData>(path, {
    method: "GET",
    headers: {
      "Authorization": auth.getToken() ?? ""
    }
  });
}

export function post<TData>(path: Path, data: TData) {
  return fetchFromApi<number>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth.getToken() ?? ""
    },
    body: JSON.stringify(data)
  });
}

export function update<TData>(path: Path, data: TData) {
  return fetchFromApi<SuccessResponse>(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth.getToken() ?? ""
    },
    body: JSON.stringify(data)
  });
}

export function deleteOne(path: Path) {
  return fetchFromApi<SuccessResponse>(path, {
    method: "DELETE",
    headers: {
      "Authorization": auth.getToken() ?? ""
    }
  });
}

// ===== ===== ===== ===== =====
// MATCHES
// ===== ===== ===== ===== =====

export function getMatch({ season, round, teamName }: ShortMatchInfo) {
  return fetchFromApi<PublicEntities.Match>(`/matches/${season}/${round}/${teamName}`);
}

export function getMatches(season: number) {
  return fetchFromApi<PublicEntities.Match[]>(`/matches/${season}`);
}

export function getMatchLineUp({ season, round, teamName }: ShortMatchInfo) {
  return fetchFromApi<{
    match: PublicEntities.Match;
    lineUp: PublicEntities.LineUp;
  }>(`/matches/${season}/${round}/${teamName}/line-up`);
}

export function updateMatch(id: PublicEntities.Match["id"], data: Partial<WithoutId<MySqlEntities.Match>>) {
  return fetchFromApi<SuccessResponse>(`/matches/${id}/update`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(data)
  });
}

// ===== ===== ===== ===== =====
// AUTH
// ===== ===== ===== ===== =====

export function login(credentials: UserCredentials) {
  return fetchFromApi<string>("/auth/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(credentials)
  });
}

export function decodeToken(auth_token: string) {
  return fetchFromApi<UserData | null>("/auth/decode-token", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ auth_token })
  });
}

// ===== ===== ===== ===== =====
// TYPES
// ===== ===== ===== ===== =====

type SuccessResponse = {
  errors?: string[];
  success?: boolean;
};

type Path = `/${string}`;