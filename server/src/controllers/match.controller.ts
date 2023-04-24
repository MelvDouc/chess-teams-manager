import matchModel from "../models/match.model.js";
import asyncWrapper from "../middleware/async-wrapper.js";

const getSeasons = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getSeasons());
});

const getMatchesOfSeason = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getMatchesOfSeason(+req.params.season));
});

const getMatch = asyncWrapper(async (req, res) => {
  res.json(
    await matchModel.getMatch({
      season: +req.params.season,
      round: +req.params.round,
      teamName: req.params.teamName
    })
  );
});

const getLineUp = asyncWrapper(async (req, res) => {
  res.json(
    await matchModel.getLineUp({
      season: +req.params.season,
      round: +req.params.round,
      teamName: req.params.teamName
    })
  );
});

const createMatch = asyncWrapper(async (req, res) => {
  const { insertId } = await matchModel.createMatch(req.body);
  res.json(insertId);
});

const updateMatch = asyncWrapper(async (req, res) => {
  const { affectedRows } = await matchModel.updateMatch(+req.params.id, req.body);
  res.json({ success: affectedRows > 0 });
});

const deleteMatch = asyncWrapper(async (req, res) => {
  const { affectedRows } = await matchModel.deleteMatch(+req.params.id);
  res.json({ success: affectedRows > 0 });
});


export default {
  getSeasons,
  getMatch,
  getMatchesOfSeason,
  getLineUp,
  createMatch,
  updateMatch,
  deleteMatch
};