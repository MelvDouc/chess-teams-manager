import { ObjectId } from "../database/db.js";
import matchModel from "../models/match.model.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import { compileTemplate } from "../services/templates.service.js";

const parityMap = new Map<boolean, string>()
  .set(true, "odd")
  .set(false, "even");

const getMatch = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getMatch({
    season: +req.params.season,
    round: +req.params.round,
    teamName: req.params.teamName
  }));
});

const downloadScoreSheet = asyncWrapper(async (req, res) => {
  const match = await matchModel.getMatch({
    season: +req.params.season,
    round: +req.params.round,
    teamName: req.params.teamName
  });

  if (!match)
    return res.contentType("html").send("<h1>Feuille de match indisponible.</h1>");

  const parity = parityMap.get(match.whiteOnOdds),
    inverseParity = parityMap.get(!match.whiteOnOdds);
  const lineUp = Object.entries(match.lineUp).reduce((acc, [board, player]) => {
    acc[`${parity}.p${board}.name`] = player?.name ?? "";
    acc[`${parity}.p${board}.ffeId`] = player?.ffeId ?? "";
    acc[`${parity}.p${board}.rating`] = player?.rating ?? "";

    if (match.captainFfeId && match.captainFfeId === player?.ffeId)
      acc[`${parity}.cap`] = player.name;

    return acc;
  }, {} as Record<string, string | number>);
  lineUp[`${inverseParity}.cap`] = ".".repeat(20);
  lineUp["referee"] = ".".repeat(20);

  const { html } = await compileTemplate("score-sheet", {
    season: `${match.season - 1}-${match.season}`,
    round: match.round,
    teamName: match.teamName,
    date: new Date(match.date).toISOString().slice(0, 10),
    city: match.city.toUpperCase(),
    [`${parity}.club`]: "Thionville",
    [`${inverseParity}.club`]: match.opponent,
    ...lineUp
  });
  res.contentType("html").send(html);
});

const getMatches = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getMatches(+req.params.season));
});

const getSeasons = asyncWrapper(async (req, res) => {
  res.json(await matchModel.getSeasons());
});

const createMatch = asyncWrapper(async (req, res) => {
  const { acknowledged, insertedId } = await matchModel.createMatch(req.body);
  res.json({ acknowledged, insertedId });
});

const updateMatch = asyncWrapper(async (req, res) => {
  const _id = new ObjectId(req.params._id);
  const { acknowledged, modifiedCount } = await matchModel.updateMatch({ _id }, {
    $set: req.body
  });
  res.json({ acknowledged, modifiedCount });
});

const deleteMatch = asyncWrapper(async (req, res) => {
  const _id = new ObjectId(req.params._id);
  const { acknowledged, deletedCount } = await matchModel.deleteMatch({ _id });
  res.json({ acknowledged, deletedCount });
});

export default {
  getMatch,
  getMatches,
  downloadScoreSheet,
  getSeasons,
  createMatch,
  updateMatch,
  deleteMatch
};