import { Observable } from "reactfree-jsx";
import { decodeToken } from "./api.js";
import { authTokenLocalStorageDataManager } from "./local-storage.service.js";
import { UserData } from "@src/types.js";

const userDataObs = new Observable<UserData | null>(null);

authTokenLocalStorageDataManager.onChange(async (token) => {
  if (!token)
    return;

  const userData = await decodeToken(token);
  userDataObs.value = userData;
});

export default {
  isLoggedIn: () => userDataObs.value !== null,
  logIn: (user: UserData) => userDataObs.value = user,
  logOut: () => userDataObs.value = null,
  onUserSet: (subscription: (user: UserData | null) => any) => userDataObs.subscribe(subscription)
};