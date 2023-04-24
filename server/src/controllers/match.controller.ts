import { RouteHandler } from "../types.js";
import matchModel from "../models/match.model.js";

const getSeasons: RouteHandler = async (req, res) => {
  res.json(await matchModel.getSeasons());
};

const getMatchesOfSeason: RouteHandler = async (req, res) => {
  res.json(await matchModel.getMatchesOfSeason(+req.params.season));
};

const getMatch: RouteHandler = async (req, res) => {
  res.json(
    await matchModel.getMatch({
      season: +req.params.season,
      round: +req.params.round,
      teamName: req.params.teamName
    })
  );
};

const getLineUp: RouteHandler = async (req, res) => {
  res.json(
    await matchModel.getLineUp({
      season: +req.params.season,
      round: +req.params.round,
      teamName: req.params.teamName
    })
  );
};


const createMatch: RouteHandler = async (req, res) => {
  res.json(await matchModel.createMatch(req.body));
};

const updateMatch: RouteHandler = async (req, res) => {
  res.json(await matchModel.updateMatch(+req.params.id, req.body));
};

const deleteMatch: RouteHandler = async (req, res) => {
  res.json(await matchModel.deleteMatch(+req.params.id));
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