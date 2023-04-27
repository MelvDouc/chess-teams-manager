import HomePage from "@src/pages/HomePage.js";
import ClubsPage from "@src/pages/clubs/ClubsPage.jsx";
import ClubCreatePage from "@src/pages/clubs/ClubCreatePage.jsx";
import ClubUpdatePage from "@src/pages/clubs/ClubUpdatePage.jsx";
import MatchesPage from "@src/pages/matches/MatchesPage.jsx";
import MatchCreatePage from "@src/pages/matches/MatchCreatePage.jsx";
import MatchUpdatePage from "@src/pages/matches/MatchUpdatePage.jsx";
import MatchLineUp from "@src/pages/matches/MatchLineUp.jsx";
import MatchSeasonsPage from "@src/pages/matches/MatchSeasonsPage.js";
import PlayersPage from "@src/pages/players/PlayersPage.js";
import PlayerCreatePage from "@src/pages/players/PlayerCreatePage.js";
import PlayerUpdatePage from "@src/pages/players/PlayerUpdatePage.js";
import TeamsPage from "@src/pages/teams/TeamsPage.jsx";
import TeamCreatePage from "@src/pages/teams/TeamCreatePage.js";
import TeamUpdatePage from "@src/pages/teams/TeamUpdatePage.js";
import { Route, RouteInfo } from "@src/types.js";

class Router {
  private routes: Map<RegExp, Route>;
  private subscriptions: ((routeInfo: RouteInfo) => any)[] = [];

  constructor() {
    this.routes = new Map();
  }

  public addRoute(url: string, route: Route<any>): this {
    this.routes.set(
      RegExp("^" + url.replace(/:([^\/]+)/g, (_, param) => `(?<${param}>[^\/]+)`) + "$"),
      route
    );
    return this;
  }

  public updateUrl(url: string): void {
    for (const [key, route] of this.routes) {
      if (key.test(url)) {
        const params = url.match(key)?.groups ?? {};
        this.notify({
          title: route.getTitle(params),
          component: () => route.component(params)
        });
        return;
      }
    }

    this.notify({
      title: "Page non trouvée",
      component: () => "page non trouvée"
    });
  }

  public onUrlChange(listener: (routeInfo: RouteInfo) => any): void {
    this.subscriptions.push(listener);
  }

  private notify(routeInfo: RouteInfo): void {
    this.subscriptions.forEach((subscription) => subscription(routeInfo));
  }
}

const router = new Router();
const homeRoute = {
  preCheck: () => Promise.resolve(true),
  getTitle: () => "Accueil",
  component: HomePage
};

router
  .addRoute("/", homeRoute)
  .addRoute("/accueil", homeRoute)
  .addRoute("/clubs", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Clubs",
    component: ClubsPage
  })
  .addRoute("/clubs/nouveau", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Ajouter un club",
    component: ClubCreatePage
  })
  .addRoute("/clubs/:id/modifier", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Modifier un club",
    component: ClubUpdatePage
  })
  .addRoute("/joueurs", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Joueurs",
    component: PlayersPage
  })
  .addRoute("/joueurs/nouveau", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Ajouter un joueur",
    component: PlayerCreatePage,
  })
  .addRoute("/joueurs/:ffeId/modifier", {
    preCheck: () => Promise.resolve(true),
    getTitle: ({ ffeId }: { ffeId: string; }) => `Modifier ${ffeId}`,
    component: PlayerUpdatePage
  })
  .addRoute("/matchs", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Matchs",
    component: MatchSeasonsPage
  })
  .addRoute("/matchs/nouveau", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Ajouter un match",
    component: MatchCreatePage
  })
  .addRoute("/matchs/:season", {
    preCheck: () => Promise.resolve(true),
    getTitle: ({ season }: { season: number; }) => `Matchs ${season - 1}-${season}`,
    component: MatchesPage
  })
  .addRoute("/matchs/:season/:round/:teamName/modifier", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Modifier un match",
    component: MatchUpdatePage
  })
  .addRoute("/matchs/:season/:round/:teamName/composition", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Composition",
    component: MatchLineUp
  })
  .addRoute("/equipes", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Équipes",
    component: TeamsPage
  })
  .addRoute("/equipes/ajouter", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Ajouter une équipe",
    component: TeamCreatePage
  })
  .addRoute("/equipes/:name/modifier", {
    preCheck: () => Promise.resolve(true),
    getTitle: ({ name }) => `Modifier ${name}`,
    component: TeamUpdatePage
  });

export default router;