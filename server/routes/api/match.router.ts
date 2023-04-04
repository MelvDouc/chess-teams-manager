import { Router } from "oak";
import matchModel from "/models/match.model.ts";
import { AppState } from "/types.ts";

const matchRouter = new Router<AppState>({ prefix: "/api/v1/matchs" });

matchRouter.get("/saisons", async ({ response }) => {
  response.body = await matchModel.getSeasons();
});

matchRouter.get("/saisons/:season", async ({ params, response }) => {
  const season = +params.season;
  response.body = await matchModel.getMatchesOfSeason(season);
});

matchRouter.get("/saisons/:season/:teamName/composition", async ({ request, response, params }) => {
  const round = Number(request.url.searchParams.get("ronde"));
  const match = await matchModel.getMatch({
    season: +params.season,
    round,
    teamName: params.teamName
  });
  let lineUp: any;

  if (!match || !(lineUp = await matchModel.getLineUp(match))) {
    response.status = 404;
    response.body = null;
    return;
  }

  response.body = lineUp;
});

export default matchRouter;