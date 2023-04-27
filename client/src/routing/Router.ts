import HomePage from "@src/pages/HomePage.js";
import $404Page from "@src/pages/404Page.jsx";
import LoginPage from "@src/pages/auth/LoginPage.jsx";
import MatchesPage from "@src/pages/matches/MatchesPage.jsx";
import MatchCreatePage from "@src/pages/matches/MatchCreatePage.jsx";
import MatchUpdatePage from "@src/pages/matches/MatchUpdatePage.jsx";
import MatchSeasonsPage from "@src/pages/matches/MatchSeasonsPage.js";
import PlayersPage from "@src/pages/players/PlayersPage.js";
import PlayerCreatePage from "@src/pages/players/PlayerCreatePage.js";
import PlayerUpdatePage from "@src/pages/players/PlayerUpdatePage.js";
import auth, { RoleIndex } from "@src/utils/auth.js";
import { Route, RouteInfo } from "@src/types.js";

class Router {
  private readonly routes: Map<RegExp, Route>;
  private readonly $404Route = {
    title: "Page non trouvée",
    component: $404Page
  } as const;
  private readonly subscriptions: ((routeInfo: RouteInfo) => any)[] = [];

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

  public navigate(url: string): void {
    history.pushState({}, "", url);
    this.updateUrl(url);
  }

  public updateUrl(url: string): void {
    if (url !== "/auth/connexion" && !auth.getUser()) {
      return this.navigate("/auth/connexion");
    }

    if (url === "/auth/connexion" && auth.getUser()) {
      return this.navigate("/matchs");
    }

    for (const [key, route] of this.routes) {
      if (key.test(url)) {
        if (route.minRole !== undefined) {
          if (RoleIndex[auth.getUser()!.role] < route.minRole)
            return this.notify(this.$404Route);
        }

        const params = url.match(key)?.groups ?? {};
        this.notify({
          title: route.getTitle(params),
          component: () => route.component(params)
        });
        return;
      }
    }

    this.notify(this.$404Route);
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
  minRole: RoleIndex.USER,
  getTitle: () => "Accueil",
  component: HomePage
};

router
  .addRoute("/", homeRoute)
  .addRoute("/accueil", homeRoute)
  .addRoute("/auth/connexion", {
    getTitle: () => "Connexion",
    component: LoginPage
  })
  .addRoute("/joueurs", {
    minRole: RoleIndex.CAPTAIN,
    getTitle: () => "Joueurs",
    component: PlayersPage
  })
  .addRoute("/joueurs/nouveau", {
    minRole: RoleIndex.CAPTAIN,
    getTitle: () => "Ajouter un joueur",
    component: PlayerCreatePage,
  })
  .addRoute("/joueurs/:ffeId/modifier", {
    minRole: RoleIndex.CAPTAIN,
    getTitle: ({ ffeId }: { ffeId: string; }) => `Modifier ${ffeId}`,
    component: PlayerUpdatePage
  })
  .addRoute("/matchs", {
    minRole: RoleIndex.USER,
    getTitle: () => "Matchs",
    component: MatchSeasonsPage
  })
  .addRoute("/matchs/nouveau", {
    minRole: RoleIndex.USER,
    getTitle: () => "Ajouter un match",
    component: MatchCreatePage
  })
  .addRoute("/matchs/:season", {
    minRole: RoleIndex.USER,
    getTitle: ({ season }: { season: number; }) => `Matchs ${season - 1}-${season}`,
    component: MatchesPage
  })
  .addRoute("/matchs/:season/:round/:teamName/modifier", {
    minRole: RoleIndex.USER,
    getTitle: () => "Modifier un match",
    component: MatchUpdatePage
  });

auth.onUserSet((user) => {
  if (!user)
    router.navigate("/auth/connexion");
});

export default router;