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
  res.json({ acknowledged, insertedId });
});

const updatePlayer = asyncWrapper(async (req, res) => {
  delete req.body._id;
  delete req.body.ffeId;
  const { acknowledged, modifiedCount } = await playerModel.updatePlayer({ ffeId: req.params.ffeId }, {
    $set: req.body
  });
  res.json({ acknowledged, modifiedCount });
});

const deletePlayer = asyncWrapper(async (req, res) => {
  const { acknowledged, deletedCount } = await playerModel.deletePlayer({ ffeId: req.params.ffeId });
  res.json({ acknowledged, deletedCount });
});


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};