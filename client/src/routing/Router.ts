import HomePage from "@pages/HomePage.js";
import MatchesPage from "@pages/MatchesPage.jsx";
import MatchCreatePage from "@pages/MatchCreatePage.jsx";
import MatchLineUp from "@pages/MatchLineUp.jsx";
import MatchSeasonsPage from "@pages/MatchSeasonsPage.js";
import PlayersPage from "@pages/PlayersPage.js";
import PlayerCreatePage from "@pages/PlayerCreatePage.js";
import PlayerUpdatePage from "@pages/PlayerUpdatePage.js";
import { Route, RouteInfo } from "@types";

class Router {
  private routes: Map<string[], Route>;
  private subscriptions: ((routeInfo: RouteInfo) => any)[] = [];

  constructor() {
    this.routes = new Map();
  }

  public addRoute(url: string, route: Route<any>): this {
    this.routes.set(url.split("/"), route);
    return this;
  }

  private getParams(urlSegments: string[], dynamicSegments: string[]) {
    if (urlSegments.length !== dynamicSegments.length)
      return null;

    const params = {} as Record<string, any>;

    for (const [i, segment] of urlSegments.entries()) {
      if (dynamicSegments[i].startsWith(":")) {
        params[dynamicSegments[i].slice(1)] = segment;
        continue;
      }

      if (segment !== dynamicSegments[i])
        return null;
    }

    return params;
  }

  public updateUrl(url: string): void {
    const segments = url.split("/");

    for (const [key, route] of this.routes) {
      const params = this.getParams(segments, key);

      if (params) {
        this.notify({
          params,
          title: route.getTitle(params),
          component: route.component
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
    getTitle: () => "Créer un match",
    component: MatchCreatePage
  })
  .addRoute("/matchs/:season", {
    preCheck: () => Promise.resolve(true),
    getTitle: ({ season }: { season: number; }) => `Matchs ${season - 1}-${season}`,
    component: MatchesPage
  })
  .addRoute("/matchs/composition/:matchId", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Composition",
    component: MatchLineUp
  });

export default router;