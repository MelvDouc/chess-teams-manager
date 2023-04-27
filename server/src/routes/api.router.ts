import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import clubController from "../controllers/club.controller.js";
import matchController from "../controllers/match.controller.js";
import playerController from "../controllers/player.controller.js";
import teamController from "../controllers/team.controller.js";

const apiRouter = Router();

apiRouter
  .get("/clubs/:id", clubController.getClub)
  .get("/clubs", clubController.getClubs)
  .post("/clubs/create", clubController.createClub)
  .put("/clubs/:id/update", clubController.updateClub);

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
  .put("/teams/:id/update", teamController.updateTeam);

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
  .post("/auth/decode-token", authController.decodeToken)
  .post("/auth/password-forgotten", authController.passwordForgotten)
  .post("/auth/password-reset/:passwordResetId", authController.passwordReset)
  .delete("/auth/logout", authController.logout);

export default apiRouter;