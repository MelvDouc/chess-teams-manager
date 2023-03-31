import { Router } from "oak";
import playerRouter from "/routes/api/player.router.ts";
import authRouter from "/routes/api/auth.router.ts";
import { render } from "/services/template.service.ts";
import { AppState } from "/types.ts";

const router = new Router<AppState>();

router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(playerRouter.routes(), playerRouter.allowedMethods());

router.get("/(accueil)?", ({ response }) => {
  response.body = render("home.jinja");
});

export default router;