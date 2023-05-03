import { Observable } from "reactfree-jsx";
import { decodeToken, logIn } from "./api.js";
import { PlayerCredentials, PlayerData } from "@src/types.js";

export { PlayerRole } from "../../../global.js";

const localStorageKey = "auth_token";
const userDataObs = new Observable<PlayerData | null>(null);

export default {
  getUser: () => userDataObs.value,
  getToken: () => localStorage.getItem(localStorageKey),
  checkCredentials: async (credentials: PlayerCredentials): Promise<boolean> => {
    const authToken = await logIn(credentials);

    if (!authToken)
      return false;

    localStorage.setItem(localStorageKey, authToken);
    userDataObs.value = await decodeToken(authToken);
    return true;
  },
  logBack: async (): Promise<boolean> => {
    const authToken = localStorage.getItem(localStorageKey);

    if (authToken) {
      const userData = await decodeToken(authToken);
      userDataObs.value = userData;
      return userData !== null;
    }

    return false;
  },
  logOut: () => {
    localStorage.removeItem(localStorageKey);
    userDataObs.value = null;
  },
  onUserChange: (subscription: (user: PlayerData | null) => any) => userDataObs.subscribe(subscription)
};