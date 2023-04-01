import { compare as comparePassword } from "bcrypt";
import { Router } from "oak";
import db from "/database/db.ts";
import { preventDoubleLogin } from "/middleware/auth.middleware.ts";
import flashService from "/services/flash.service.ts";
import { render } from "/services/template.service.ts";
import { AppState, DbEntities } from "/types.ts";

const authRouter = new Router<AppState>();

authRouter
  .get("/connexion", preventDoubleLogin, ({ response }) => {
    response.body = render("auth/login.jinja");
  })
  .post("/connexion", async ({ state, request, response }) => {
    const formData = await request.body().value as URLSearchParams;
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      flashService.errors = ["Veuillez remplir tous les champs."];
      return response.redirect("/connexion");
    }

    const user = await db.users().findOne({ email, password });

    if (!user || !(await comparePassword(password, user.password))) {
      flashService.errors = ["Identifiants invalides."];
      return response.redirect("/connexion");
    }

    state.session.set("user", {
      email,
      role: user.role
    });
    flashService.success = "Vous êtes désormais connecté(e).";
    response.redirect("/");
  });

authRouter
  .get("/oubli-mot-de-passe", ({ response }) => {
    response.body = render("password-forgotten.jinja");
  })
  .post("/oubli-mot-de-passe", async ({ request, response }) => {
    const formData = await request.body().value as URLSearchParams;
    const email = formData.get("email");
    let user: DbEntities.User | null | undefined;

    if (!email || !(user = await db.users().findOne({ email }))) {
      flashService.errors = ["Adresse email invalide."];
      return response.redirect(request.url);
    }

    // TODO: set password reset id
    // TODO: send email
  });

export default authRouter;