import { Router } from "oak";
import { default as nunjucks } from "nunjucks";
import db from "/database/db.ts";

const playerRouter = new Router({ prefix: "/joueurs" });

const getPlayer = (ffeId: string) => db.players().findOne({ ffeId });

playerRouter
  .get("/nouveau", ({ response }) => {
    response.body = nunjucks.render("player/create-player.jinja");
  })
  .post("/nouveau", async ({ request, response }) => {
    const formData = await request.body().value as URLSearchParams;

  });

playerRouter.get("/:ffeId", async ({ response, params }) => {
  const player = await getPlayer(params.ffeId);

  response.body = nunjucks.render("player/player.jinja", {
    title: (player) ? `${player.firstName} ${player.lastName}` : "Joueur non trouvé",
    player
  });
});

playerRouter.get("/", async ({ response }) => {
  const players = await db.players().find().toArray();

  response.body = nunjucks.render("player/players.jinja", {
    players
  });
});

playerRouter
  .get("/:ffeId/modifier", async ({ request, response, params }) => {
    const player = await getPlayer(params.ffeId);

    response.body = nunjucks.render("player/update-player.jinja", {
      title: (player) ? `Modifier ${player.firstName} ${player.lastName}` : "Joueur non trouvé",
      action: request.url.pathname,
      player
    });
  })
  .post("/:ffeId/modifier", async ({ response, params }) => {
    const player = await getPlayer(params.ffeId);
    // TODO: validate player
    response.redirect("/joueurs");
  });


export default playerRouter;