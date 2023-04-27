import asyncWrapper from "../middleware/async-wrapper.js";
import playerModel from "../models/player.model.js";

const getPlayer = asyncWrapper(async (req, res) => {
  res.json(await playerModel.getPlayer({ ffeId: req.params.ffeId }));
});

const getPlayers = asyncWrapper(async (req, res) => {
  const players = await playerModel.getPlayers();
  res.json(
    players.map(({ pwd, pwdResetId, ...others }) => ({ ...others }))
  );
});

const createPlayer = asyncWrapper(async (req, res) => {
  const { acknowledged, insertedId } = await playerModel.createPlayer(req.body);
  res.json({ success: acknowledged && !!insertedId });
});

const updatePlayer = asyncWrapper(async (req, res) => {
  const { acknowledged, modifiedCount } = await playerModel.updatePlayer({ ffeId: req.params.ffeId }, req.body);
  res.json({ success: acknowledged && modifiedCount > 0 });
});

const deletePlayer = asyncWrapper(async (req, res) => {
  const { acknowledged, deletedCount } = await playerModel.deletePlayer({ ffeId: req.params.ffeId });
  res.json({ success: acknowledged && deletedCount > 0 });
});


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};