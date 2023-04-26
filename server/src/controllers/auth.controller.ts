import { randomBytes } from "node:crypto";
import * as bcryptjs from "bcryptjs";
import config from "../config/config.js";
import userModel from "../models/user.model.js";
import emailService from "../services/email.service.js";
import { RouteHandler } from "../types.js";

const login: RouteHandler = async (req, res) => {
  const data = req.body;
  const { email, password } = data as { email: string; password: string; };
  const user = await userModel.getUser({ email });

  if (!user || !bcryptjs.compareSync(password, user.password))
    return res.json({
      errors: ["Identifiants invalides."]
    });

  // TODO: session
  res.json({ success: true });
};

const passwordForgotten: RouteHandler = async (req, res) => {
  const data = req.body;
  const { email } = data as { email: string; };
  const user = await userModel.getUser({ email });

  if (!user)
    return res.json({
      errors: ["Adresse email invalide."]
    });

  const password_reset_id = randomBytes(32).toString("hex");
  await userModel.updateUser(email, { password_reset_id });
  const sendResult = await emailService.sendEmail({
    templateName: "password-reset",
    to: email,
    subject: "Réinitialisation du mot de passe",
    context: {
      link: `${config.CLIENT_URL}/nouveau-mot-de-passe/${password_reset_id}`
    }
  });
  res.json({ success: !!sendResult });
};

const passwordReset: RouteHandler = async (req, res) => {
  const user = await userModel.getUser({ password_reset_id: req.params.passwordResetId });

  if (!user)
    return res.json({
      errors: ["Id de réinitialisation invalide."]
    });

  const { password1, password2 } = req.body;

  if (!password2 || password1 !== password2)
    return res.json({
      errors: ["Mot de passe invalide."]
    });

  const salt = await bcryptjs.genSalt(10);
  await userModel.updateUser(user.email, {
    password: await bcryptjs.hash(password2, salt),
    password_reset_id: null
  });
  res.json({ success: true });
};

const logout: RouteHandler = (req, res) => {
  // state.session.delete("user");
  res.json({ success: true });
};


export default {
  login,
  logout,
  passwordForgotten,
  passwordReset
};