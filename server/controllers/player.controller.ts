import { RouterMiddleware } from "oak";
import playerModel from "/models/player.model.ts";

const getPlayer: RouterMiddleware<"/players/:ffeId"> = async ({ params, response }) => {
  response.body = await playerModel.getPlayer(params.ffeId);
};

const getPlayers: RouterMiddleware<"/players"> = async ({ response }) => {
  response.body = await playerModel.getPlayers();
};

const createPlayer: RouterMiddleware<"/players/create"> = async ({ request, response }) => {
  const data = await request.body().value;
  const insertResult = await playerModel.createPlayer(data);
  response.body = insertResult;
};

const updatePlayer: RouterMiddleware<"/players/:ffeId/update"> = async ({ request, response, params }) => {
  const data = await request.body().value;
  const updateResult = await playerModel.updatePlayer(params.ffeId, data);
  response.body = updateResult;
};

const deletePlayer: RouterMiddleware<"/players/:ffeId/delete"> = async ({ params, response }) => {
  response.body = await playerModel.deletePlayer(params.ffeId);
};


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};