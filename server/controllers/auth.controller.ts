import { RouterMiddleware } from "oak";
import { randomBytes } from "crypto";
import { compare as comparePassword, genSalt, hash } from "bcrypt";
import config from "/config/config.ts";
import userModel from "/models/user.model.ts";
import emailService from "/services/email.service.ts";

const login: RouterMiddleware<"/auth/login"> = async ({ request, response, state }) => {
  const data = await request.body().value;
  const { email, password } = data as { email: string; password: string; };
  const user = await userModel.getUser({ email });

  if (!user || !(await comparePassword(password, user.password))) {
    response.body = {
      errors: ["Identifiants invalides."]
    };
    return;
  }

  state.session.set("user", {
    email,
    role: user.role
  });
  response.body = { success: true };
};

const passwordForgotten: RouterMiddleware<"/auth/password-forgotten"> = async ({ request, response }) => {
  const data = await request.body().value;
  const { email } = data as { email: string; };
  const user = await userModel.getUser({ email });

  if (!user) {
    response.body = {
      errors: ["Adresse email invalide."]
    };
    return;
  }

  const password_reset_id = randomBytes(32).toString("hex");
  await userModel.updateUser(email, { password_reset_id });
  await emailService.sendEmail("password-reset", {
    to: email,
    subject: "Réinitialisation du mot de passe"
  }, { link: `${config.CLIENT_URL}/nouveau-mot-de-passe/${password_reset_id}` });
  response.body = { success: true };
};

const passwordReset: RouterMiddleware<"/auth/password-reset/:passwordResetId"> = async ({ request, response, params }) => {
  const user = await userModel.getUser({ password_reset_id: params.passwordResetId });

  if (!user) {
    response.body = {
      errors: ["Id de réinitialisation invalide."]
    };
    return;
  }

  const { password1, password2 } = await request.body().value;

  if (!password2 || password1 !== password2) {
    response.body = {
      errors: ["Mot de passe invalide."]
    };
    return;
  }

  const salt = await genSalt(10);
  await userModel.updateUser(user.email, {
    password: await hash(password2, salt),
    password_reset_id: null
  });
  response.body = { success: true };
};

const logout: RouterMiddleware<"/auth/logout"> = ({ response, state }) => {
  state.session.delete("user");
  response.body = { success: true };
};


export default {
  login,
  logout,
  passwordForgotten,
  passwordReset
};