import { RouterMiddleware } from "oak";
import teamModel from "/models/team.model.ts";

const getTeam: RouterMiddleware<"/teams/:name"> = async ({ params, response }) => {
  response.body = await teamModel.getTeam(params.name);
};

const getTeams: RouterMiddleware<"/teams"> = async ({ response }) => {
  response.body = await teamModel.getTeams();
};

const createTeam: RouterMiddleware<"/teams/create"> = async ({ request, response }) => {
  const data = await request.body().value;
  response.body = await teamModel.createTeam(data);
};

const updateTeam: RouterMiddleware<"/teams/:id/update"> = async ({ request, response, params }) => {
  const data = await request.body().value;
  response.body = await teamModel.updateTeam(+params.id, data);;
};

const deleteTeam: RouterMiddleware<"/teams/:id/delete"> = async ({ params, response }) => {
  response.body = await teamModel.deleteTeam(+params.id);
};


export default {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
};