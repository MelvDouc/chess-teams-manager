import { Router } from "oak";
import authController from "/controllers/auth.controller.ts";
import clubController from "/controllers/club.controller.ts";
import matchController from "/controllers/match.controller.ts";
import playerController from "/controllers/player.controller.ts";
import teamController from "/controllers/team.controller.ts";

const apiRouter = new Router({ prefix: "/api/v1" });

apiRouter
  .get("/clubs/:id", clubController.getClub)
  .get("/clubs", clubController.getClubs)
  .post("/clubs/create", clubController.createClub)
  .put("/clubs/:id/update", clubController.updateClub)
  .delete("/clubs/:id/delete", clubController.deleteClub);

apiRouter
  .get("/players/:ffeId", playerController.getPlayer)
  .get("/players", playerController.getPlayers)
  .post("/players/create", playerController.createPlayer)
  .put("/players/:ffeId/update", playerController.updatePlayer)
  .delete("/players/:ffeId/delete", playerController.deletePlayer);

apiRouter
  .get("/teams/:name", teamController.getTeam)
  .get("/teams", teamController.getTeams)
  .post("/teams/create", teamController.createTeam)
  .put("/teams/:id/update", teamController.updateTeam)
  .delete("/teams/:id/delete", teamController.deleteTeam);

apiRouter
  .get("/matches/seasons", matchController.getSeasons)
  .get("/matches/:season", matchController.getMatchesOfSeason)
  .get("/matches/:season/:round/:teamName", matchController.getMatch)
  // TODO: line-up CRUD
  .get("/matches/:season/:round/:teamName/line-up", matchController.getLineUp)
  .post("/matches/create", matchController.createMatch)
  .put("/matches/:id/update", matchController.updateMatch)
  .delete("/matches/:id/delete", matchController.deleteMatch);

apiRouter
  .post("/auth/login", authController.login)
  .post("/auth/password-forgotten", authController.passwordForgotten)
  .post("/auth/password-reset/:passwordResetId", authController.passwordReset)
  .delete("/auth/logout", authController.logout);

export default apiRouter;