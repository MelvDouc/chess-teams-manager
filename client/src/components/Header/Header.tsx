import { Observable } from "reactfree-jsx";
import LogOutButton from "@src/components/LogOutButton/LogOutButton.jsx";
import router from "@src/router.jsx";
import auth, { RoleIndex } from "@src/utils/auth.js";
import cssClasses from "./Header.module.scss";

export default function Header() {
  const hideLinksObs = new Observable(true);
  auth.onUserSet((user) => hideLinksObs.value = !user);

  return (
    <header className={`${cssClasses.header} d-flex justify-content-between align-items-center flex-wrap bg-dark text-light px-2 py-3`}>
      <section>
        <h1 className="m-0">Thionville Échecs — Équipes</h1>
      </section>
      <section>
        <nav className="h-100">
          <ul className="m-0 p-0 d-flex flex-wrap justify-content-end align-items-center gap-3 list-style-none">
            <li classes={{ "d-none": hideLinksObs }}>
              <router.link to="/matchs">Matchs</router.link>
            </li>
            <li
              className="d-none"
              $init={(element) => {
                auth.onUserSet((user) => {
                  (user && RoleIndex[user.role] >= RoleIndex.CAPTAIN)
                    ? element.classList.remove("d-none")
                    : element.classList.add("d-none");
                });
              }}
            >
              <router.link to="/joueurs">Joueurs</router.link>
            </li>
            <li>
              <div classes={{
                "d-flex": true,
                "justify-content-center": true,
                "align-items-center": true,
                "d-none": hideLinksObs
              }}>
                <LogOutButton />
              </div>
            </li>
          </ul>
        </nav>
      </section>
    </header >
  );
}