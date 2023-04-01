import { Router } from "oak";
import matchRouter from "/routes/api/match.router.ts";
import playerRouter from "/routes/api/player.router.ts";
import authRouter from "/routes/api/auth.router.ts";
import { render } from "/services/template.service.ts";
import { AppState } from "/types.ts";
import { redirectToLogin } from "/middleware/auth.middleware.ts";

const router = new Router<AppState>();

router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(matchRouter.routes(), matchRouter.allowedMethods());
router.use(playerRouter.routes(), playerRouter.allowedMethods());

router.get("/(accueil)?", redirectToLogin, ({ response }) => {
  response.body = render("home.jinja");
});

export default router;