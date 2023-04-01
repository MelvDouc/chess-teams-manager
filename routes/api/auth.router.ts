import { compare as comparePassword } from "bcrypt";
import { randomBytes } from "crypto";
import { Router } from "oak";
import db from "/database/db.ts";
import { preventDoubleLogin } from "/middleware/auth.middleware.ts";
import emailService from "/services/email.service.ts";
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
    response.body = render("auth/password-forgotten.jinja");
  })
  .post("/oubli-mot-de-passe", async ({ request, response }) => {
    const formData = await request.body().value as URLSearchParams;
    const email = formData.get("email");
    let user: DbEntities.User | null | undefined;

    if (!email || !(user = await db.users().findOne({ email }))) {
      flashService.errors = ["Adresse email invalide."];
      return response.redirect(request.url);
    }

    const passwordResetId = randomBytes(32).toString("hex");
    await db.users().updateOne({ email: user.email }, {
      $set: { passwordResetId }
    });
    await emailService.sendEmail("password-reset", {
      to: email,
      subject: "Réinitialisation du mot de passe"
    }, { link: `${Deno.env.get("BASE_URL")}/${passwordResetId}` });
    flashService.success = `Un lien de réinitialisation de votre mot de passe vous a été envoyé à ${email}.`;
    response.redirect("/");
  });

authRouter.param("passwordResetId", async (param, { response }, next) => {
  const user = await db.users().findOne({ passwordResetId: param });

  if (!user) {
    flashService.errors = ["Utilisateur non trouvé."];
    response.redirect("/");
  }

  flashService.temp = { user };
  await next();
});
authRouter
  .get("/nouveau-mot-de-passe/:passwordResetId", ({ response }) => {
    response.body = render("auth/password-reset.jinja");
  })
  .post("/nouveau-mot-de-passe/:passwordResetId", async ({ request, response }) => {
    const user = flashService.temp.user as DbEntities.User;
    const formData = await request.body().value as URLSearchParams;
    const password = formData.get("password"),
      confirmPassword = formData.get("confirmPassword");
    const errors: string[] = [];

    if (!password)
      errors.push("Nouveau mot de passe requis.");
    if (!confirmPassword)
      errors.push("Confirmation du nouveau mot de passe requise.");
    if (password && confirmPassword && password !== confirmPassword)
      errors.push("Les mots de passe ne se correspondent pas.");

    if (errors.length) {
      flashService.errors = errors;
      return response.redirect(request.url);
    }

    await db.users().updateOne({ email: user.email }, {
      $set: { password: password! },
      $unset: { passwordResetId: "" }
    });
    flashService.success = "Votre mot de passe a bien été mis à jour. Vous pouvez vous connecter.";
    response.redirect("/connexion");
  });

export default authRouter;