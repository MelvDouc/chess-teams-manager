import { ObjectId } from "../database/db.js";
import matchModel from "../models/match.model.js";
import playerModel from "../models/player.model.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import { compileTemplate } from "../services/templates.service.js";
import { Player } from "../types.js";

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
  const players = await playerModel.getPlayers();
  const playersMap = players.reduce((acc, p) => {
    return acc.set(p.ffeId, p);
  }, new Map<string, Player>());
  const ps = {} as any;

  for (const key in match.lineUp) {
    const { ffeId, rating } = match.lineUp[key];
    const player = (ffeId) ? playersMap.get(ffeId) : null;
    ps[`${parity}.p${key}.name`] = (player) ? `${player.firstName} ${player.lastName}` : "";
    ps[`${parity}.p${key}.ffeId`] = player?.ffeId ?? "";
    ps[`${parity}.p${key}.rating`] = rating ?? player?.rating ?? "";
  }

  const { html } = await compileTemplate("score-sheet", {
    season: match.season,
    round: match.round,
    date: new Date(match.date).toISOString().slice(0, 10),
    place: match.address.split(/\s+/).at(-1),
    [`${parity}.club`]: "Thionville",
    [`${inverseParity}.club`]: match.opponent,
    ...ps
  });
  res.setHeader("Content-disposition", "attachment; filename=feuille-de-match.html");
  res.set("Content-Type", "text/html");
  res.send(html);
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