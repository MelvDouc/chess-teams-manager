import RouterLink from "@routing/RouterLink.jsx";
import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={`${cssClasses.header} d-flex justify-content-between align-items-center bg-dark text-light px-2 py-3`}>
      <section>
        <h1>Thionville Échecs — Équipes</h1>
      </section>
      <section>
        <nav className={cssClasses.nav}>
          <ul className="m-0 p-0 d-flex gap-3 list-style-none">
            <li>
              <RouterLink href="/accueil">Accueil</RouterLink>
            </li>
            <li>
              <RouterLink href="/matchs">Matchs</RouterLink>
            </li>
            <li>
              <RouterLink href="/joueurs">Joueurs</RouterLink>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}