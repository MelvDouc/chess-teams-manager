import { default as nunjucks } from "nunjucks";
import { Router } from "oak";
import playerRouter from "/routes/api/player.router.ts";
import authRouter from "/routes/api/auth.router.ts";
import { AppState } from "/types.ts";

const router = new Router<AppState>();

router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(playerRouter.routes(), playerRouter.allowedMethods());

router.get("/(accueil)?", ({ response, state }) => {
  response.body = nunjucks.render("home.jinja", {
    flashSuccess: state.session.get("flashSuccess"),
    flashErrors: state.session.get("flashErrors")
  });
});

export default router;