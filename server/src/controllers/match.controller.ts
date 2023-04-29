import { ObjectId } from "../database/db.js";
import matchModel from "../models/match.model.js";
import asyncWrapper from "../middleware/async-wrapper.js";

const getMatch = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getMatch({
    season: +req.params.season,
    round: +req.params.round,
    teamName: req.params.teamName
  }));
});

const getMatches = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getMatches(+req.params.season));
});

const getSeasons = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getSeasons());
});

const createMatch = asyncWrapper(async (req, res) => {
  const { acknowledged, insertedId } = await matchModel.createMatch(req.body);
  res.json({ success: acknowledged && !!insertedId });
});

const updateMatch = asyncWrapper(async (req, res) => {
  const _id = new ObjectId(req.params._id);
  const { acknowledged } = await matchModel.updateMatch({ _id }, {
    $set: req.body
  });
  res.json({ success: acknowledged });
});

const deleteMatch = asyncWrapper(async (req, res) => {
  const _id = new ObjectId(req.params._id);
  const { acknowledged, deletedCount } = await matchModel.deleteMatch({ _id });
  res.json({ success: acknowledged && deletedCount > 0 });
});


export default {
  getMatch,
  getMatches,
  getSeasons,
  createMatch,
  updateMatch,
  deleteMatch
};