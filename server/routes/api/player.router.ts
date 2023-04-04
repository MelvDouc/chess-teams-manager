import { Router } from "oak";
import playerModel from "/models/player.model.ts";
import { isNonEmptyString, isValidEmail, isValidFfeId } from "/models/validators.ts";
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
  const player = await request.body().value as DbEntities.Player;
  player.fideId ??= null;
  const errors: string[] = [];

  if (!isNonEmptyString(player.ffeId) || !isValidFfeId(player.ffeId))
    errors.push("N° FFE invalide.");
  else if (await playerModel.getPlayer({ ffeId: player.ffeId }))
    errors.push("Il existe déjà un joueur avec ce n° FFE.");

  if (typeof player.fideId === "number") {
    if (isNaN(player.fideId))
      errors.push("N° FIDE invalide.");
    else if (await playerModel.getPlayer({ fideId: player.fideId }))
      errors.push("Il existe déjà un joueur avec ce n° FIDE.");
  }

  if (!isNonEmptyString(player.firstName))
    errors.push("Prénom requis.");

  if (!isNonEmptyString(player.lastName))
    errors.push("Nom de famille requis.");

  if (!isNonEmptyString(player.email) || !isValidEmail(player.email))
    errors.push("Email invalide.");

  if (errors.length) {
    response.status = 503;
    response.body = { success: false, errors };
    return;
  }

  await playerModel.createPlayer(player as DbEntities.Player);
  response.body = { success: true };
});

playerRouter.patch("/:ffeId/modifier", async ({ request, response, params }) => {
  const playerInDb = await playerModel.getPlayer({ ffeId: params.ffeId });

  if (!playerInDb) {
    response.status = 404;
    response.body = { errors: ["Joueur non trouvé."] };
    return;
  }

  const updates = await request.body().value as DbEntities.Player;
  updates.fideId ??= null;
  const errors: string[] = [];

  if (updates.ffeId !== playerInDb.ffeId) {
    if (!isNonEmptyString(updates.ffeId) || !isValidFfeId(updates.ffeId))
      errors.push("N° FFE invalide.");
    else if (await playerModel.getPlayer({ ffeId: updates.ffeId })) {
      errors.push("Il existe un autre joueur avec ce n° FFE.");
    }
  }

  if (updates.fideId !== playerInDb.fideId && typeof updates.fideId === "number") {
    if (isNaN(updates.fideId))
      errors.push("N° FIDE invalide.");
    else if (await playerModel.getPlayer({ fideId: updates.fideId }))
      errors.push("Il existe un autre joueur avec ce n° FIDE.");
  }

  if (updates.email !== playerInDb.email && (!isNonEmptyString(updates.email) || !isValidEmail(updates.email)))
    errors.push("Email invalide.");

  if (!isNonEmptyString(updates.firstName))
    errors.push("Prénom requis.");

  if (!isNonEmptyString(updates.lastName))
    errors.push("Nom de famille requis.");

  if (errors.length) {
    response.body = { success: false, errors };
    return;
  }

  const updateResult = await playerModel.updatePlayer(params.ffeId, updates as DbEntities.Player);
  response.body = { success: true, updateResult };
});

playerRouter.delete("/:ffeId/supprimer", async ({ params, response }) => {
  const deleteResult = await playerModel.deletePlayer(params.ffeId);
  response.body = { success: !!deleteResult };
});


export default playerRouter;