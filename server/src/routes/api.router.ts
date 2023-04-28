import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import matchController from "../controllers/match.controller.js";
import playerController from "../controllers/player.controller.js";

const apiRouter = Router();

apiRouter
  .get("/players/:ffeId", playerController.getPlayer)
  .get("/players", playerController.getPlayers)
  .post("/players/create", playerController.createPlayer)
  .put("/players/:ffeId/update", playerController.updatePlayer)
  .delete("/players/:ffeId/delete", playerController.deletePlayer);

apiRouter
  .get("/matches/seasons", matchController.getSeasons)
  .get("/matches/:season", matchController.getMatches)
  .get("/matches/:season/:round/:teamName", matchController.getMatch)
  .post("/matches/create", matchController.createMatch)
  .put("/matches/:_id/update", matchController.updateMatch)
  .delete("/matches/:_id/delete", matchController.deleteMatch);

apiRouter
  .post("/auth/login", authController.login)
  .post("/auth/decode-token", authController.decodeToken)
  .post("/auth/password-forgotten", authController.passwordForgotten)
  .post("/auth/password-reset/:pwdResetId", authController.passwordReset);

export default apiRouter;