import { ObjectId } from "mongo";
import { Router, RouterMiddleware } from "oak";
import matchModel from "/models/match.model.ts";
import { DbEntities } from "/types.ts";

const getMatchesOfSeason: RouterMiddleware<"/par-saison"> = async ({ request, response }) => {
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

const getLineUp: RouterMiddleware<"/composition/:id"> = async ({ response, params }) => {
  response.body = await matchModel.getLineUp({ _id: new ObjectId(params.id) });
};

const updateLineUp: RouterMiddleware<"/composition/:id"> = async ({ request, response, params }) => {
  const lineUp = await request.body().value as any;

  if (Array.isArray(lineUp) || !lineUp.every((element: { board: number; ffeId: string; }) => {
    return !!element
      && typeof element.board === "number"
      && typeof element.ffeId === "string";
  })) {
    response.body = { success: false };
    return;
  }

  await matchModel.updateMatch(new ObjectId(params.id), { lineUp });
  response.body = { success: true };
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
  .post("/nouveau", createMatch)
  .patch("/:id/modifier", updateMatch)
  .delete("/supprimer", deleteMatch)
  .get("/par-saison", getMatchesOfSeason)
  .get("/saisons", getSeasons)
  .get("/composition/:id", getLineUp)
  .patch("/composition/:id", updateLineUp);

export default matchRouter;