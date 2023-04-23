import { Router } from "oak";
import apiRouter from "../routes/api.router.ts";
import clientController from "../controllers/client.controller.ts";
import { AppState } from "../types.ts";

const router = new Router<AppState>();

router.use(apiRouter.routes(), apiRouter.allowedMethods());
router.get("/(.*)", clientController.home);

export default router;