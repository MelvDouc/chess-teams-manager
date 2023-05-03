import LogOutButton from "@src/components/Header/LogOutButton.jsx";
import router from "@src/router.jsx";
import { PlayerData } from "@src/types.js";

export default function NavBarText({ user, onUserChange, logOut }: {
  user: PlayerData | null;
  onUserChange: (subscription: (user: PlayerData | null) => void) => void;
  logOut: VoidFunction;
}) {
  const getElement = (user: PlayerData | null) => {
    return (user)
      ? (
        <div className="d-flex align-items-center gap-2">
          <span>{user.ffeId}</span>
          <LogOutButton logOut={logOut} />
        </div>
      )
      : (
        <router.link to="/connexion" className="nav-link">Connexion</router.link>
      );
  };

  return (
    <div $init={(element) => {
      onUserChange((user) => {
        element.replaceChildren(getElement(user));
      });
    }}>{getElement(user)}</div>
  );
}