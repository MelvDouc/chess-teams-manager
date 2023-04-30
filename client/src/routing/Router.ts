import HomePage from "@src/pages/HomePage.js";
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
import PlayerUpdatePage from "@src/pages/players/PlayerUpdatePage.js";
import auth, { RoleIndex } from "@src/utils/auth.js";
import { Route, RouteInfo } from "@src/types.js";

export class Router {
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
    url = url.replace(/:([^\/]+)/g, (_, param) => `(?<${param}>[^\/]+)`);
    this.routes.set(RegExp(`^${url}\$`), route);
    return this;
  }

  public navigate(url: string): void {
    history.pushState({}, "", url);
    this.updateUrl(url);
  }

  public updateUrl(url: string): void {
    for (const [key, route] of this.routes) {
      if (key.test(url)) {
        if (route.preCheck && !route.preCheck(this))
          return;

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

const allowCaptainMinimum = (router: Router) => {
  const user = auth.getUser();

  if (!user || RoleIndex[user.role] < RoleIndex.CAPTAIN) {
    router.navigate("/connexion");
    return false;
  }

  return true;
};

const preventDoubleLogIn = (router: Router) => {
  if (auth.getUser()) {
    router.navigate("/");
    return false;
  }

  return true;
};

const homeRoute: Route = {
  preCheck: (router) => {
    if (!auth.getUser()) {
      router.navigate("/connexion");
      return false;
    }

    return true;
  },
  getTitle: () => "Accueil",
  component: HomePage
};

router
  .addRoute("/", homeRoute)
  .addRoute("/accueil", homeRoute)
  .addRoute("/connexion", {
    preCheck: preventDoubleLogIn,
    getTitle: () => "Connexion",
    component: LoginPage
  })
  .addRoute("/oubli-mot-de-passe", {
    preCheck: preventDoubleLogIn,
    getTitle: () => "Demande de réinitialisation de de mot de passe",
    component: PasswordForgottenPage
  })
  .addRoute("/nouveau-mot-de-passe/:pwdResetId", {
    preCheck: preventDoubleLogIn,
    getTitle: () => "Réinitialisation de de mot de passe",
    component: PasswordResetPage
  })
  .addRoute("/joueurs", {
    preCheck: allowCaptainMinimum,
    getTitle: () => "Joueurs",
    component: PlayersPage
  })
  .addRoute("/joueurs/nouveau", {
    preCheck: allowCaptainMinimum,
    getTitle: () => "Ajouter un joueur",
    component: PlayerCreatePage,
  })
  .addRoute("/joueurs/:ffeId/modifier", {
    preCheck: allowCaptainMinimum,
    getTitle: ({ ffeId }: { ffeId: string; }) => `Modifier ${ffeId}`,
    component: PlayerUpdatePage
  })
  .addRoute("/matchs", {
    preCheck: allowCaptainMinimum,
    getTitle: () => "Matchs",
    component: MatchSeasonsPage
  })
  .addRoute("/matchs/nouveau", {
    preCheck: allowCaptainMinimum,
    getTitle: () => "Ajouter un match",
    component: MatchCreatePage
  })
  .addRoute("/matchs/:season", {
    preCheck: allowCaptainMinimum,
    getTitle: ({ season }: { season: number; }) => `Matchs ${season - 1}-${season}`,
    component: MatchesPage
  })
  .addRoute("/matchs/:season/:round/:teamName/modifier", {
    preCheck: allowCaptainMinimum,
    getTitle: () => "Modifier un match",
    component: MatchUpdatePage
  });

auth.onUserSet((user) => {
  if (!user)
    router.navigate("/connexion");
});

export default router;