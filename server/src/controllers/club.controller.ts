import clubModel from "../models/club.model.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import { RouteHandler } from "../types.js";

const getClub: RouteHandler = asyncWrapper(async (req, res) => {
  res.json(await clubModel.getClub(+req.params.id));
});

const getClubs: RouteHandler = asyncWrapper(async (req, res) => {
  res.json(await clubModel.getClubs());
});

const createClub: RouteHandler = asyncWrapper(async (req, res) => {
  const { insertId } = await clubModel.createClub(req.body);
  res.json(insertId);
});

const updateClub: RouteHandler = asyncWrapper(async (req, res) => {
  const { affectedRows } = await clubModel.updateClub(+req.params.id, req.body);
  res.json({ success: affectedRows > 0 });
});

const deleteClub: RouteHandler = asyncWrapper(async (req, res) => {
  const { affectedRows } = await clubModel.deleteClub(+req.params.id);
  res.json({ success: affectedRows > 0 });
});


export default {
  getClub,
  getClubs,
  createClub,
  updateClub,
  deleteClub
};