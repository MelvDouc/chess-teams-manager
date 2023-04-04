import { Router } from "oak";
import matchRouter from "/routes/api/match.router.ts";
import playerRouter from "/routes/api/player.router.ts";
import authRouter from "/routes/api/auth.router.ts";
import { AppState } from "/types.ts";

const router = new Router<AppState>();

router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(matchRouter.routes(), matchRouter.allowedMethods());
router.use(playerRouter.routes(), playerRouter.allowedMethods());

// TODO: client

export default router;