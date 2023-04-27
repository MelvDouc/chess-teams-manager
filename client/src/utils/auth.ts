import { Observable } from "reactfree-jsx";
import { decodeToken, login } from "./api.js";
import { PlayerCredentials, PlayerData } from "@src/types.js";

export enum RoleIndex {
  USER,
  CAPTAIN,
  ADMIN
}

const localStorageKey = "auth_token";
const userDataObs = new Observable<PlayerData | null>(null);

export default {
  getUser: () => userDataObs.value,
  getToken: () => localStorage.getItem(localStorageKey),
  logIn: async (credentials: PlayerCredentials): Promise<boolean> => {
    const authToken = await login(credentials);

    if (!authToken)
      return false;

    localStorage.setItem(localStorageKey, authToken);
    userDataObs.value = await decodeToken(authToken);
    return true;
  },
  logBack: async () => {
    const authToken = localStorage.getItem(localStorageKey);

    if (authToken) {
      const userData = await decodeToken(authToken);
      userDataObs.value = userData;
    }
  },
  logOut: () => {
    localStorage.removeItem(localStorageKey);
    userDataObs.value = null;
  },
  onUserSet: (subscription: (user: PlayerData | null) => any) => userDataObs.subscribe(subscription)
};