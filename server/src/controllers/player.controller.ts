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
  const errors = playerModel.getNewPlayerErrors(req.body);

  if (errors)
    return res.json({ errors });

  await playerModel.createPlayer(req.body);
  res.json({ success: true });
});

const updatePlayer = asyncWrapper(async (req, res) => {
  const errors = playerModel.getPlayerUpdateErrors(req.body);

  if (!errors)
    return res.json({ acknowledged: false });

  delete req.body._id;
  delete req.body.ffeId;

  await playerModel.updatePlayer({ ffeId: req.params.ffeId }, {
    $set: req.body
  });
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