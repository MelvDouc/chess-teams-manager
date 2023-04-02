import { Router } from "oak";
import matchModel from "/models/match.model.ts";
import { render } from "/services/template.service.ts";
import { redirectToLogin } from "/middleware/auth.middleware.ts";
import { AppState, DbEntities } from "/types.ts";

const matchRouter = new Router<AppState>({ prefix: "/matchs" });

matchRouter.use(redirectToLogin);

matchRouter.get("/", async ({ response }) => {
  response.body = render("match/seasons.jinja", {
    seasons: await matchModel.getSeasons()
  });
});

matchRouter.get("/:season", async ({ params, response }) => {
  const season = +params.season;
  const matches = await matchModel.getMatchesOfSeason(season);
  response.body = render("match/matches-by-season.jinja", {
    season,
    matches
  });
});

matchRouter.get("/:season/:teamName/composition", async ({ request, response, params }) => {
  const season = +params.season;
  const { teamName } = params;
  const round = Number(request.url.searchParams.get("ronde"));
  const match = (await matchModel.getMatch({ season, round, teamName }))!;
  const lineUp = await matchModel.getLineUp(match);
  response.body = render("match/line-up.jinja", {
    season,
    teamName,
    round,
    lineUp
  });
});

export default matchRouter;