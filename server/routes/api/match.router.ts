import { ObjectId } from "mongo";
import { Router } from "oak";
import matchModel from "/models/match.model.ts";
import { AppState, DbEntities } from "/types.ts";

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

matchRouter.post("/nouveau", async ({ request, response }) => {
  const match = await request.body().value as DbEntities.Match;
  const errors = matchModel.getMatchErrors(match);

  if (errors.length) {
    response.body = { success: false, errors };
    return;
  }

  await matchModel.createMatch(match);
  response.body = { success: true };
});

matchRouter.patch("/:id/modifier", async ({ request, response, params }) => {
  const matchInDb = await matchModel.getMatch({ _id: new ObjectId(params.id) });

  if (!matchInDb) {
    response.status = 404;
    response.body = null;
    return;
  }

  const match = await request.body().value as DbEntities.Match;
  const errors = matchModel.getMatchErrors(match);

  if (errors.length) {
    response.body = { success: false, errors };
    return;
  }

  await matchModel.updateMatch((matchInDb as DbEntities.Match)._id, match);
  response.body = { success: true };
});

matchRouter.delete("/supprimer", async ({ request, response }) => {
  const id = request.headers.get("match_id");
  response.body = {
    success: !!id && !!(await matchModel.deleteMatch(id))
  };
});

export default matchRouter;