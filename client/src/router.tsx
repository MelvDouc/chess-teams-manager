import { Router } from "reactfree-jsx";
import $404Page from "@src/pages/404Page.jsx";
import LoginPage from "@src/pages/auth/LoginPage.jsx";
import PasswordForgottenPage from "@src/pages/auth/PasswordForgottenPage.jsx";
import PasswordResetPage from "@src/pages/auth/PasswordResetPage.jsx";
import MatchesPage from "@src/pages/matches/MatchesPage.jsx";
import MatchCreatePage from "@src/pages/matches/MatchCreatePage.jsx";
import MatchUpdatePage from "@src/pages/matches/MatchUpdatePage.jsx";
import MatchSeasonsPage from "@src/pages/matches/MatchSeasonsPage.js";
import PlayersPage from "@src/pages/players/PlayersPage.js";
import PlayerCreatePage from "@src/pages/players/PlayerCreatePage.js";

const router = new Router({
  $404Route: {
    title: "Page non trouvée",
    component: $404Page,
  },
  pageTitleFormatter: (title) => `${title} | Thionville Échecs — Équipes`,
});

router
  .addRoute("/connexion", {
    getPageTitle: () => "Connexion",
    component: LoginPage,
  })
  .addRoute("/oubli-mot-de-passe", {
    getPageTitle: () => "Demande de réinitialisation de de mot de passe",
    component: PasswordForgottenPage,
  })
  .addRoute("/nouveau-mot-de-passe/:pwdResetId", {
    getPageTitle: () => "Réinitialisation de de mot de passe",
    component: PasswordResetPage,
  })
  .addRoute("/joueurs", {
    getPageTitle: () => "Joueurs",
    component: PlayersPage,
  })
  .addRoute("/joueurs/nouveau", {
    getPageTitle: () => "Ajouter un joueur",
    component: PlayerCreatePage,
  })
  .addRoute("/", {
    getPageTitle: () => "Matchs",
    component: MatchSeasonsPage,
  })
  .addRoute("/matchs", {
    getPageTitle: () => "Matchs",
    component: MatchSeasonsPage,
  })
  .addRoute("/matchs/nouveau", {
    getPageTitle: () => "Ajouter un match",
    component: MatchCreatePage,
  })
  .addRoute("/matchs/:season", {
    getPageTitle: ({ season }) => `Matchs ${+season - 1}-${season}`,
    component: MatchesPage,
  })
  .addRoute("/matchs/:season/:round/:teamName/modifier", {
    getPageTitle: () => "Modifier un match",
    component: MatchUpdatePage,
  });

export default router;
