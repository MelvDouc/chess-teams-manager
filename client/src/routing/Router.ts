import HomePage from "@pages/HomePage.js";
import MatchesPage from "@pages/MatchesPage.jsx";
import MatchLineUp from "@pages/MatchLineUp.jsx";
import MatchSeasonsPage from "@pages/MatchSeasonsPage.js";
import PlayersPage from "@pages/PlayersPage.js";
import PlayerCreatePage from "@pages/PlayerCreatePage.js";
import PlayerUpdatePage from "@pages/PlayerUpdatePage.js";
import { Route } from "@types";

class Router {
  private routes: Map<string | RegExp, Route>;
  private subscriptions: ((route: Route) => any)[] = [];

  constructor() {
    this.routes = new Map();
  }

  public addRoute(url: string | RegExp, route: Route): this {
    this.routes.set(url, route);
    return this;
  }

  public updateUrl(url: string): void {
    for (const [key, route] of this.routes) {
      if (typeof key === "string" && key === url || key instanceof RegExp && key.test(url)) {
        this.notify(route);
        return;
      }
    }

    this.notify(this.routes.get("404")!);
  }

  public onUrlChange(listener: (route: Route) => any): void {
    this.subscriptions.push(listener);
  }

  private notify(route: Route): void {
    this.subscriptions.forEach((subscription) => subscription(route));
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
  .addRoute(/^\/joueurs\/\w+\/modifier/, {
    preCheck: () => Promise.resolve(true),
    getParams: (pathname) => {
      const ffeId = pathname.split("/")[2];
      return { ffeId };
    },
    getTitle: ({ ffeId }: { ffeId: string; }) => `Modifier ${ffeId}`,
    component: PlayerUpdatePage
  })
  .addRoute("/matchs", {
    preCheck: () => Promise.resolve(true),
    getTitle: () => "Matchs",
    component: MatchSeasonsPage
  })
  .addRoute(/^\/matchs\/\d+$/, {
    preCheck: () => Promise.resolve(true),
    getParams: (pathname) => {
      const season = pathname.split("/").at(-1);
      return { season: Number(season) };
    },
    getTitle: ({ season }: { season: number; }) => `Match ${season - 1}-${season}`,
    component: MatchesPage
  })
  .addRoute(/^\/matchs\/\d+\/[^\/]+\/composition/, {
    preCheck: () => Promise.resolve(true),
    getParams: (pathname) => {
      const { season, teamName } = pathname.match(/^\/matchs\/(?<season>\d+)\/(?<teamName>[^\/]+)\/composition/)?.groups ?? {};
      return {
        season: Number(season),
        teamName: teamName ?? "",
        round: Number(new URLSearchParams(location.search).get("ronde"))
      };
    },
    getTitle: ({ season, teamName, round }: {
      season: number;
      teamName: string;
      round: number;
    }) => `${teamName} - Ronde ${round} - ${season}`,
    component: MatchLineUp
  });

export default router;