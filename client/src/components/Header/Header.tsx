import RouterLink from "@src/routing/RouterLink.jsx";
import auth from "@src/utils/auth.js";
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
                  user
                    ? (
                      <>
                        <li>
                          <RouterLink href="/clubs">Clubs</RouterLink>
                        </li>
                        <li>
                          <RouterLink href="/matchs">Matchs</RouterLink>
                        </li>
                        <li>
                          <RouterLink href="/joueurs">Joueurs</RouterLink>
                        </li>
                        <li>
                          <RouterLink href="/equipes">Équipes</RouterLink>
                        </li>
                      </>
                    )
                    : <></>
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