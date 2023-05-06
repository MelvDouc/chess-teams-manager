import asyncWrapper from "../middleware/async-wrapper.js";
import playerModel from "../models/player.model.js";
import { Player, UpdateFilter } from "../types.js";

const playerKeys: Readonly<(keyof Player)[]> = [
  "fideId",
  "firstName",
  "lastName",
  "email",
  "phone1",
  "phone2",
  "birthDate",
  "rating",
  "teams",
  "isAdmin",
  "isCaptain",
];

const getPlayer = asyncWrapper(async (req, res) => {
  const player = await playerModel.getPlayer({ ffeId: req.params.ffeId });

  if (!player)
    return res.json(null);

  const { pwd, pwdResetId, ...others } = player;
  res.json({ ...others });
});

const getPlayers = asyncWrapper(async (req, res) => {
  const players = await playerModel.getPlayers();
  res.json(
    players.map(({ pwd, pwdResetId, ...others }) => ({ ...others }))
  );
});

const createPlayer = asyncWrapper(async (req, res) => {
  const errors = playerModel.getNewPlayerErrors(req.body);

  if (errors)
    return res.json({ success: false, errors });

  Object.keys(req.body).forEach((key) => {
    if (!playerKeys.includes(key as keyof Player))
      delete req.body[key];
  });
  await playerModel.createPlayer(req.body);
  res.json({ success: true });
});

const updatePlayer = asyncWrapper(async (req, res) => {
  const errors = playerModel.getPlayerUpdateErrors(req.body);

  if (errors)
    return res.json({ success: false, errors });

  const updateFilter = playerKeys.reduce((acc, key) => {
    (key in req.body)
      ? acc["$set"]![key] = req.body[key]
      : acc["$unset"]![key] = "";
    return acc;
  }, { $set: {}, $unset: {} } as UpdateFilter<Player>);
  await playerModel.updatePlayer({ ffeId: req.params.ffeId }, updateFilter);
  res.json({ success: true });
});

const deletePlayer = asyncWrapper(async (req, res) => {
  const { acknowledged, deletedCount } = await playerModel.deletePlayer({ ffeId: req.params.ffeId });
  res.json({ success: acknowledged && deletedCount > 1 });
});


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};