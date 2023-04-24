import { RouteHandler } from "../types.js";
import teamModel from "../models/team.model.js";

const getTeam: RouteHandler = async (req, res) => {
  res.json(await teamModel.getTeam(req.params.name));
};

const getTeams: RouteHandler = async (req, res) => {
  res.json(await teamModel.getTeams());
};

const createTeam: RouteHandler = async (req, res) => {
  res.json(await teamModel.createTeam(req.body));
};

const updateTeam: RouteHandler = async (req, res) => {
  res.json(await teamModel.updateTeam(+req.params.id, req.body));
};

const deleteTeam: RouteHandler = async (req, res) => {
  res.json(await teamModel.deleteTeam(+req.params.id));
};


export default {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
};