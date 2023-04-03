import HomePage from "@pages/HomePage.js";
import PlayersPage from "@pages/PlayersPage.js";
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
  });

export default router;