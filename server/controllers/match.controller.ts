import { RouterMiddleware } from "oak";
import matchModel from "/models/match.model.ts";

const getSeasons: RouterMiddleware<"/matches/seasons"> = async ({ response }) => {
  response.body = await matchModel.getSeasons();
};

const getMatchesOfSeason: RouterMiddleware<"/matches/:season"> = async ({ params, response }) => {
  response.body = await matchModel.getMatchesOfSeason(+params.season);
};

const getMatch: RouterMiddleware<"/matches/:season/:round/:teamName"> = async ({ params, response }) => {
  response.body = await matchModel.getMatch({
    season: +params.season,
    round: +params.round,
    teamName: params.teamName
  });
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
  response.body = await matchModel.createMatch(data);
};

const updateMatch: RouterMiddleware<"/matches/:id/update"> = async ({ params, request, response }) => {
  const data = await request.body().value;
  response.body = await matchModel.updateMatch(+params.id, data);
};

const deleteMatch: RouterMiddleware<"/matches/:id/delete"> = async ({ params, response }) => {
  response.body = await matchModel.deleteMatch(+params.id);
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