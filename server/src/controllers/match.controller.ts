import { ObjectId } from "../database/db.js";
import matchModel from "../models/match.model.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import { compileTemplate } from "../services/templates.service.js";

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
    throw "err";

  const parity = (match.whiteOnOdds) ? "odd" : "even";
  const inverseParity = (parity === "odd") ? "even" : "odd";
  const lineUp = Object.entries(match.lineUp).reduce((acc, [board, player]) => {
    acc[`${parity}.p${board}.name`] = player?.name ?? "";
    acc[`${parity}.p${board}.ffeId`] = player?.ffeId ?? "";
    acc[`${parity}.p${board}.rating`] = player?.rating ?? "";

    if (match.captainFfeId && match.captainFfeId === player?.ffeId)
      acc[`${parity}.cap`] = player.name;

    return acc;
  }, {} as Record<string, string | number>);



  const { html } = await compileTemplate("score-sheet", {
    season: `${match.season - 1}-${match.season}`,
    round: match.round,
    date: new Date(match.date).toISOString().slice(0, 10),
    place: match.address.split(/\s+/).at(-1),
    [`${parity}.club`]: "Thionville",
    [`${inverseParity}.club`]: match.opponent,
    ...lineUp
  });
  res.setHeader("Content-disposition", "attachment; filename=feuille-de-match.html");
  res.set("Content-Type", "text/html");
  res.send(html);
  res.end();
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
  downloadScoreSheet,
  getSeasons,
  createMatch,
  updateMatch,
  deleteMatch
};