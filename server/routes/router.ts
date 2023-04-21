import { Router } from "oak";
import apiRouter from "/routes/api.router.ts";
import { AppState } from "/types.ts";

const router = new Router<AppState>();
router.use(apiRouter.routes(), apiRouter.allowedMethods());

// TODO: client

export default router;