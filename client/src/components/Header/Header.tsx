import LogOutButton from "@src/components/LogOutButton/LogOutButton.jsx";
import RouterLink from "@src/routing/RouterLink.jsx";
import auth, { RoleIndex } from "@src/utils/auth.js";
import { PlayerRole } from "@src/types.js";
import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={`${cssClasses.header} d-flex justify-content-between align-items-center bg-dark text-light px-2 py-3`}>
      <section>
        <h1>Thionville Échecs — Équipes</h1>
      </section>
      <section>
        <nav className={cssClasses.nav}>
          <ul
            className="m-0 p-0 d-flex gap-3 list-style-none"
            $init={(element) => {
              auth.onUserSet((user) => {
                element.replaceChildren(
                  user ? getLinks(user.role) : <></>
                );
              });
            }}
          >
          </ul>
        </nav>
      </section>
    </header>
  );
}

function getLinks(role: PlayerRole) {
  return (
    <>
      <li>
        <RouterLink href="/">Accueil</RouterLink>
      </li>
      <li>
        <RouterLink href="/matchs">Matchs</RouterLink>
      </li>
      {
        (RoleIndex[role] >= RoleIndex.CAPTAIN)
          ? (<>
            <li>
              <RouterLink href="/joueurs">Joueurs</RouterLink>
            </li>
          </>)
          : null
      }
      <li>
        <div className="d-flex justify-content-center align-items-center">
          <LogOutButton />
        </div>
      </li>
    </>
  );
}