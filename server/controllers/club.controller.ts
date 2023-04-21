import { RouterMiddleware } from "oak";
import clubModel from "/models/club.model.ts";

const getClub: RouterMiddleware<"/clubs/:id"> = async ({ params, response }) => {
  response.body = await clubModel.getClub(+params.id);
};

const getClubs: RouterMiddleware<"/clubs"> = async ({ response }) => {
  response.body = await clubModel.getClubs();
};

const createClub: RouterMiddleware<"/clubs/create"> = async ({ request, response }) => {
  const data = await request.body().value;
  response.body = await clubModel.createClub(data);
};

const updateClub: RouterMiddleware<"/clubs/:id/update"> = async ({ request, response, params }) => {
  const data = await request.body().value;
  response.body = await clubModel.updateClub(+params.id, data);;
};

const deleteClub: RouterMiddleware<"/clubs/:id/delete"> = async ({ params, response }) => {
  response.body = await clubModel.deleteClub(+params.id);
};


export default {
  getClub,
  getClubs,
  createClub,
  updateClub,
  deleteClub
};