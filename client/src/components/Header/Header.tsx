import RouterLink from "@routing/RouterLink.jsx";
import cssClasses from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cssClasses.header}>
      <section className="header-left">
        <h1>Thionville Échecs — Équipes</h1>
      </section>
      <section className="header-right">
        <nav>
          <ul>
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