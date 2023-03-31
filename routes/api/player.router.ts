import { Router } from "oak";
import { default as nunjucks } from "nunjucks";
import playerModel from "/models/player.model.ts";
import { AppState, DbEntities } from "/types.ts";

const playerRouter = new Router<AppState>({ prefix: "/joueurs" });

playerRouter
  .get("/nouveau", ({ response, state }) => {
    response.body = nunjucks.render("player/create-player.jinja", {
      player: state.session.get("player"),
      flashErrors: state.session.get("flashErrors")
    });
  })
  .post("/nouveau", playerModel.createValidationMiddleware, async ({ response, state }) => {
    const errors = state.session.get("formErrors");
    const playerData = state.session.get("formData") as DbEntities.Player;

    if (errors) {
      state.session.flash("player", playerData);
      state.session.flash("flashErrors", errors);
      return response.redirect("/joueurs/nouveau");
    }

    const insertedId = await playerModel.createPlayer(playerData);
    response.redirect("/joueurs");
  });

playerRouter.get("/:ffeId", async ({ response, params }) => {
  const player = await playerModel.getPlayer(params.ffeId);

  response.body = nunjucks.render("player/player.jinja", {
    title: (player) ? `${player.firstName} ${player.lastName}` : "Joueur non trouvé",
    player
  });
});

playerRouter.get("/", async ({ response }) => {
  response.body = nunjucks.render("player/players.jinja", {
    players: await playerModel.getPlayers()
  });
});

playerRouter
  .get("/:ffeId/modifier", async ({ request, response, params, state }) => {
    const player = state.session.get("player") as DbEntities.Player | undefined ?? await playerModel.getPlayer(params.ffeId);

    response.body = nunjucks.render("player/update-player.jinja", {
      title: (player) ? `Modifier ${player.firstName} ${player.lastName}` : "Joueur non trouvé",
      action: request.url.pathname,
      flashErrors: state.session.get("flashErrors"),
      player
    });
  })
  .post("/:ffeId/modifier", playerModel.updateValidationMiddleware, async ({ request, response, params, state }) => {
    const errors = state.session.get("formErrors");
    const playerData = state.session.get("formData") as DbEntities.Player;

    if (errors) {
      state.session.flash("player", playerData);
      state.session.flash("flashErrors", errors);
      return response.redirect(request.url);
    }

    const updates = await playerModel.updatePlayer(params.ffeId, playerData);
    response.redirect("/joueurs");
  });

playerRouter.post("/:ffeId/supprimer", async ({ params, state, response }) => {
  const deleteResult = await playerModel.deletePlayer(params.ffeId);

  if (!deleteResult)
    state.session.flash("flashErrors", ["Le joueur n'a pas pu être supprimé."]);
  else
    state.session.flash("flashSuccess", "Le joueur a bien été supprimé.");

  return response.redirect("/joueurs");
});


export default playerRouter;