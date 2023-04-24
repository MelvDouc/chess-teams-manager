import asyncWrapper from "../middleware/async-wrapper.js";
import teamModel from "../models/team.model.js";

const getTeam = asyncWrapper(async (req, res) => {
  res.json(await teamModel.getTeam(req.params.name));
});

const getTeams = asyncWrapper(async (req, res) => {
  res.json(await teamModel.getTeams());
});

const createTeam = asyncWrapper(async (req, res) => {
  const { insertId } = await teamModel.createTeam(req.body);
  res.json(insertId);
});

const updateTeam = asyncWrapper(async (req, res) => {
  const { affectedRows } = await teamModel.updateTeam(+req.params.id, req.body);
  res.json({ success: affectedRows > 0 });
});

const deleteTeam = asyncWrapper(async (req, res) => {
  const { affectedRows } = await teamModel.deleteTeam(+req.params.id);
  res.json({ success: affectedRows > 0 });
});


export default {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
};