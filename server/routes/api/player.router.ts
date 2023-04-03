import { Router } from "oak";
import { render } from "/services/template.service.ts";
import playerModel from "/models/player.model.ts";
import { AppState, DbEntities } from "/types.ts";
import flashService from "/services/flash.service.ts";
import { redirectToLogin } from "/middleware/auth.middleware.ts";

const playerRouter = new Router<AppState>({ prefix: "/joueurs" });

playerRouter.use(redirectToLogin);

playerRouter.get("/", async ({ response }) => {
  const players = await playerModel.getPlayers();
  response.body = render("player/players.jinja", { players });
});

playerRouter
  .get("/nouveau", ({ response }) => {
    response.body = render("player/create-player.jinja", {
      player: flashService.temp?.player
    });
  })
  .post("/nouveau", async ({ request, response }) => {
    const formData = await request.body().value as URLSearchParams;
    const player = playerModel.extractData(formData);
    const errors: string[] = [];

    if (player.ffeId === null)
      errors.push("N° FFE requis.");
    else if (!/^[A-Z]\d+$/.test(player.ffeId))
      errors.push("N° FFE invalide.");
    else if (await playerModel.getPlayer({ ffeId: player.ffeId }))
      errors.push("Il existe déjà un joueur avec ce n° FFE.");
    if (typeof player.fideId === "number" && isNaN(player.fideId)) {
      console.log({ fideId: player.ffeId });
      errors.push("N° FIDE invalide.");
    }
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
      flashService.errors = errors;
      flashService.temp = { player };
      return response.redirect("/joueurs/nouveau");
    }

    await playerModel.createPlayer(player as DbEntities.Player);
    flashService.success = "Le joueur a bien été créé.";
    response.redirect("/joueurs");
  });

playerRouter
  .get("/:ffeId/modifier", async ({ request, response, params }) => {
    const player = flashService.temp?.player ?? await playerModel.getPlayer({ ffeId: params.ffeId });

    response.body = render("player/update-player.jinja", {
      title: (player) ? `Modifier ${player.firstName} ${player.lastName}` : "Joueur non trouvé",
      action: request.url.pathname,
      player
    });
  })
  .post("/:ffeId/modifier", async ({ request, response, params }) => {
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
      flashService.errors = errors;
      flashService.temp = { player: { ...player, ffeId: params.ffeId } };
      return response.redirect(request.url);
    }

    await playerModel.updatePlayer(params.ffeId, player as DbEntities.Player);
    flashService.success = "Le joueur a bien été modifié.";
    response.redirect("/joueurs");
  });

playerRouter.post("/:ffeId/supprimer", async ({ params, response }) => {
  const deleteResult = await playerModel.deletePlayer(params.ffeId);

  if (!deleteResult)
    flashService.errors = ["Le joueur n'a pas pu être supprimé."];
  else
    flashService.success = "Le joueur a bien été supprimé.";

  return response.redirect("/joueurs");
});


export default playerRouter;