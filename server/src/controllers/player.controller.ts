import { RouteHandler } from "../types.js";
import playerModel from "../models/player.model.js";

const getPlayer: RouteHandler = async (req, res) => {
  res.json(await playerModel.getPlayer(req.params.ffeId));
};

const getPlayers: RouteHandler = async (req, res) => {
  res.json(await playerModel.getPlayers());
};

const createPlayer: RouteHandler = async (req, res) => {
  res.json(await playerModel.createPlayer(req.body));
};

const updatePlayer: RouteHandler = async (req, res) => {
  res.json(await playerModel.updatePlayer(req.params.ffeId, req.body));
};

const deletePlayer: RouteHandler = async (req, res) => {
  res.json(await playerModel.deletePlayer(req.params.ffeId));
};


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};