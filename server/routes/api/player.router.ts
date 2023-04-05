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
  const player = playerModel.ensurePlayer(await request.body().value as DbEntities.Player);
  const errors = await playerModel.getCreateErrors(player);

  if (errors.length) {
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
    response.body = null;
    return;
  }

  const updates = playerModel.ensurePlayer(await request.body().value as DbEntities.Player);
  const errors = await playerModel.getUpdateErrors(updates, playerInDb);

  if (errors.length) {
    response.body = { success: false, errors };
    return;
  }

  const updateResult = await playerModel.updatePlayer(params.ffeId, updates);
  response.body = { success: true, updateResult };
});

playerRouter.delete("/supprimer", async ({ request, response }) => {
  const ffeId = request.headers.get("ffe_id");
  response.body = {
    success: !!ffeId && !!(await playerModel.deletePlayer(ffeId))
  };
});


export default playerRouter;