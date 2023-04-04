import { Router } from "oak";
import playerModel from "/models/player.model.ts";
import { AppState, DbEntities } from "/types.ts";

const playerRouter = new Router<AppState>({ prefix: "/api/v1/joueurs" });

playerRouter.get("/:ffeId", async ({ response, params }) => {
  const player = await playerModel.getPlayer({ ffeId: params.ffeId });

  if (!player) {
    response.status = 404;
    response.body = null;
    return;
  }

  response.body = player;
});

playerRouter.get("/", async ({ response }) => {
  response.body = await playerModel.getPlayers();
});

playerRouter.post("/nouveau", async ({ request, response }) => {
  const formData = await request.body().value as URLSearchParams;
  const player = playerModel.extractData(formData);
  const errors: string[] = [];

  if (player.ffeId === null)
    errors.push("N° FFE requis.");
  else if (!/^[A-Z]\d+$/.test(player.ffeId))
    errors.push("N° FFE invalide.");
  else if (await playerModel.getPlayer({ ffeId: player.ffeId }))
    errors.push("Il existe déjà un joueur avec ce n° FFE.");
  if (typeof player.fideId === "number" && isNaN(player.fideId))
    errors.push("N° FIDE invalide.");
  if (player.fideId !== null && (await playerModel.getPlayer({ fideId: player.fideId })))
    errors.push("Il existe déjà un joueur avec ce n° FIDE.");
  if (!player.firstName)
    errors.push("Prénom requis.");
  if (!player.lastName)
    errors.push("Nom de famille requis.");
  if (!player.email)
    errors.push("Adresse email requise.");
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(player.email))
    errors.push("Email invalide.");
  if (isNaN(player.rating as number) || (player.rating as number) < 0)
    errors.push("Le classement Elo doit être supérieur ou égal à 0.");

  if (errors.length) {
    response.status = 503;
    response.body = { errors };
    return;
  }

  const objectId = await playerModel.createPlayer(player as DbEntities.Player);
  response.body = { objectId };
});

playerRouter.patch("/:ffeId/modifier", async ({ request, response, params }) => {
  const formData = await request.body().value as URLSearchParams;
  const player = playerModel.extractData(formData);
  const errors: string[] = [];

  if (player.ffeId === null)
    errors.push("N° FFE requis.");
  else if (!/^[A-Z]\d+$/.test(player.ffeId))
    errors.push("N° FFE invalide.");
  if (typeof player.fideId === "number" && isNaN(player.fideId))
    errors.push("N° FIDE invalide.");
  if (!player.firstName)
    errors.push("Prénom requis.");
  if (!player.lastName)
    errors.push("Nom de famille requis.");
  if (!player.email)
    errors.push("Adresse email requise.");
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(player.email))
    errors.push("Email invalide.");
  if (isNaN(player.rating as number) || (player.rating as number) < 0)
    errors.push("Le classement Elo doit être supérieur ou égal à 0.");

  if (errors.length) {
    response.status = 503;
    response.body = { errors };
    return;
  }

  const updateResult = await playerModel.updatePlayer(params.ffeId, player as DbEntities.Player);
  response.body = updateResult;
});

playerRouter.delete("/:ffeId/supprimer", async ({ params, response }) => {
  const deleteResult = await playerModel.deletePlayer(params.ffeId);

  if (deleteResult!) {
    response.status = 503;
    response.body = {
      errors: ["Le joueur n'a pas pu être supprimé."]
    };
    return;
  }

  response.body = { message: "Le joueur a bien été supprimé." };
});


export default playerRouter;