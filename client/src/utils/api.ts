import auth from "./auth.js";
import { PlayerCredentials, PlayerData } from "@src/types.js";

export const SERVER_URL = (import.meta.env.DEV)
  ? import.meta.env.VITE_SERVER_URL
  : window.location.origin;
const API_BASE_URL = SERVER_URL + "/api/v1";

const jsonHeaders = {
  "Content-Type": "application/json"
};

async function fetchFromApi<T>(path: Path, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(API_BASE_URL + path, init);
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

export function post<TData, TReturnValue = Acknowledgeable & { insertId: string; }>(path: Path, data: TData) {
  return fetchFromApi<TReturnValue>(path, {
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
  return fetchFromApi<Acknowledgeable & { deletedCount: number; }>(path, {
    method: "DELETE",
    headers: {
      "Authorization": auth.getToken() ?? ""
    }
  });
}

export function createLink(path: Path) {
  return API_BASE_URL + path;
}

// ===== ===== ===== ===== =====
// AUTH
// ===== ===== ===== ===== =====

export function logIn(credentials: PlayerCredentials) {
  return fetchFromApi<string>("/auth/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(credentials)
  });
}

export function decodeToken(auth_token: string) {
  return fetchFromApi<PlayerData | null>("/auth/decode-token", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ auth_token })
  });
}

// ===== ===== ===== ===== =====
// TYPES
// ===== ===== ===== ===== =====

interface Acknowledgeable {
  acknowledged: boolean;
}

type SuccessResponse<T extends boolean = any> = {
  success: T;
  errors: T extends false ? string[] : never;
};

type Path = `/${string}`;