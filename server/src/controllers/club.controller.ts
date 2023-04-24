import clubModel from "../models/club.model.js";
import { RouteHandler } from "../types.js";

const getClub: RouteHandler = async (req, res) => {
  res.json(await clubModel.getClub(+req.params.id));
};

const getClubs: RouteHandler = async (req, res) => {
  res.json(await clubModel.getClubs());
};

const createClub: RouteHandler = async (req, res) => {
  res.json(
    await clubModel.createClub(req.body)
  );
};

const updateClub: RouteHandler = async (req, res) => {
  res.json(
    await clubModel.updateClub(+req.params.id, req.body)
  );
};

const deleteClub: RouteHandler = async (req, res) => {
  res.json(
    await clubModel.deleteClub(+req.params.id)
  );
};


export default {
  getClub,
  getClubs,
  createClub,
  updateClub,
  deleteClub
};