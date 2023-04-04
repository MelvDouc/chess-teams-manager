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

matchRouter.get("/saisons/:season/composition", async ({ request, response, params }) => {
  response.body = await matchModel.getLineUp(
    +params.season,
    Number(request.url.searchParams.get("ronde")),
    Number(request.url.searchParams.get("id_equipe")),
  );
});

export default matchRouter;