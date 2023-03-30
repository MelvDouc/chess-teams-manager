import { compare as comparePassword } from "bcrypt";
import { default as nunjucks } from "nunjucks";
import { Router } from "oak";
import db from "/database/db.ts";
import { AppState } from "/types.ts";

const authRouter = new Router<AppState>();

// TODO: check if logged in

authRouter
  .get("/connexion", ({ response, state }) => {
    response.body = nunjucks.render("auth/login.jinja", {
      flashErrors: state.session.get("flashErrors")
    });
  })
  .post("/connexion", async ({ state, request, response }) => {
    const formData = await request.body().value as URLSearchParams;
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      state.session.flash("flashErrors", ["Veuillez remplir tous les champs."]);
      return response.redirect("/connexion");
    }

    const user = await db.users().findOne({ email, password });

    if (!user || !(await comparePassword(password, user.password))) {
      state.session.flash("flashErrors", ["Identifiants invalides."]);
      return response.redirect("/connexion");
    }

    state.session.set("user", {
      email,
      role: user.role
    });
    state.session.flash("flashSuccess", "Vous êtes désormais connecté(e).");
    response.redirect("/");
  });

export default authRouter;