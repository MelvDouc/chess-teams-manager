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
  response.body = await matchModel.getLineUp({
    season: +params.season,
    round: Number(request.url.searchParams.get("ronde")),
    teamName: params.teamName
  });
});

export default matchRouter;