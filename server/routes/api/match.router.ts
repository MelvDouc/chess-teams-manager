import { ObjectId } from "mongo";
import { Router, RouterMiddleware } from "oak";
import matchModel from "/models/match.model.ts";
import { DbEntities } from "/types.ts";

const getMatchesOfSeason: RouterMiddleware<"/"> = async ({ request, response }) => {
  const season = request.url.searchParams.get("saison");

  if (!season) {
    response.status = 404;
    response.body = null;
    return;
  }

  response.body = await matchModel.getMatchesOfSeason(+season);
};

const getSeasons: RouterMiddleware<"/saisons"> = async ({ response }) => {
  response.body = await matchModel.getSeasons();
};

const getLineUp: RouterMiddleware<"/:id/composition"> = async ({ response, params }) => {
  response.body = await matchModel.getLineUp({ _id: new ObjectId(params.id) });
};

const createMatch: RouterMiddleware<"/nouveau"> = async ({ request, response }) => {
  const match = matchModel.ensureMatch(await request.body().value as DbEntities.Match);
  const errors = matchModel.getMatchErrors(match);

  if (errors.length) {
    response.body = { success: false, errors };
    return;
  }

  await matchModel.createMatch(match);
  response.body = { success: true };
};

const updateMatch: RouterMiddleware<"/:id/modifier"> = async ({ request, response, params }) => {
  const matchInDb = await matchModel.getMatch({ _id: new ObjectId(params.id) });

  if (!matchInDb) {
    response.status = 404;
    response.body = null;
    return;
  }

  const match = matchModel.ensureMatch(await request.body().value as DbEntities.Match);
  const errors = matchModel.getMatchErrors(match);

  if (errors.length) {
    response.body = { success: false, errors };
    return;
  }

  await matchModel.updateMatch(matchInDb._id, match);
  response.body = { success: true };
};

const deleteMatch: RouterMiddleware<"/supprimer"> = async ({ request, response }) => {
  const id = request.headers.get("match_id");
  response.body = {
    success: !!id && !!(await matchModel.deleteMatch(id))
  };
};

const matchRouter = (new Router({ prefix: "/api/v1/matchs" }))
  .get("/", getMatchesOfSeason)
  .get("/saisons", getSeasons)
  .get("/:id/composition", getLineUp)
  .post("/nouveau", createMatch)
  .patch("/:id/modifier", updateMatch)
  .delete("/supprimer", deleteMatch);

export default matchRouter;