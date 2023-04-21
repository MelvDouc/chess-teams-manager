import { RouterMiddleware } from "oak";
import matchModel from "/models/match.model.ts";

const getSeasons: RouterMiddleware<"/matches/seasons"> = async ({ response }) => {
  response.body = await matchModel.getSeasons();
};

const getMatchesOfSeason: RouterMiddleware<"/matches/:season"> = async ({ params, response }) => {
  response.body = await matchModel.getMatchesOfSeason(+params.season);
};

const getMatch: RouterMiddleware<"/matches/:season/:round/:teamName"> = async ({ params, response }) => {
  const match = await matchModel.getMatch({
    season: +params.season,
    round: +params.round,
    teamName: params.teamName
  });

  response.body = match;
};

const getLineUp: RouterMiddleware<"/matches/:season/:round/:teamName/line-up"> = async ({ params, response }) => {
  response.body = await matchModel.getLineUp({
    season: +params.season,
    round: +params.round,
    teamName: params.teamName
  });
};


const createMatch: RouterMiddleware<"/matches/create"> = async ({ request, response }) => {
  const data = await request.body().value;
  // TODO: prevent duplicates
  const insertResult = await matchModel.createMatch(matchModel.ensureMatch(data));
  response.body = insertResult;
};

const updateMatch: RouterMiddleware<"/matches/:id/update"> = async ({ params, request, response }) => {
  const data = await request.body().value;
  const updateResult = await matchModel.updateMatch(+params.id, data);
  response.body = updateResult;
};

const deleteMatch: RouterMiddleware<"/matches/:id/delete"> = async ({ params, response }) => {
  const deleteResult = await matchModel.deleteMatch(+params.id);
  response.body = deleteResult;
};


export default {
  getSeasons,
  getMatch,
  getMatchesOfSeason,
  getLineUp,
  createMatch,
  updateMatch,
  deleteMatch
};