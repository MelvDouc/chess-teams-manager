import asyncWrapper from "../middleware/async-wrapper.js";
import playerModel from "../models/player.model.js";

const getPlayer = asyncWrapper(async (req, res) => {
  res.json(await playerModel.getPlayer({ ffe_id: req.params.ffeId }));
});

const getPlayers = asyncWrapper(async (req, res) => {
  res.json(await playerModel.getPlayers());
});

const createPlayer = asyncWrapper(async (req, res) => {
  const { insertId } = await playerModel.createPlayer(req.body);
  res.json(insertId);
});

const updatePlayer = asyncWrapper(async (req, res) => {
  const { affectedRows } = await playerModel.updatePlayer({ ffe_id: req.params.ffeId }, req.body);
  res.json({ success: affectedRows > 0 });
});

const deletePlayer = asyncWrapper(async (req, res) => {
  const { affectedRows } = await playerModel.deletePlayer({ ffe_id: req.params.ffeId });
  res.json({ success: affectedRows > 0 });
});


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};