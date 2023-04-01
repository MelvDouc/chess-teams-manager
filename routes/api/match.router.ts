import { Router } from "oak";
import { render } from "/services/template.service.ts";
import matchModel from "/models/match.model.ts";
import { AppState, DbEntities } from "/types.ts";

const matchRouter = new Router<AppState>({ prefix: "/matchs" });

matchRouter.get("/", async ({ response }) => {
  response.body = render("match/seasons.jinja", {
    seasons: await matchModel.getSeasons()
  });
});

matchRouter.get("/:season", async ({ params, response }) => {
  const season = +params.season;
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short"
  });
  const matches = await matchModel.getMatchesOfSeason(season);
  matches.forEach(({ matches }) => {
    matches.forEach((match) => (match.date as any) = dateFormatter.format(new Date(match.date)));
  });
  response.body = render("match/matches-by-season.jinja", {
    season,
    matches
  });
});

export default matchRouter;