import { randomBytes } from "node:crypto";
import { default as bcryptjs } from "bcryptjs";
import config from "../config/config.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import playerModel from "../models/player.model.js";
import emailService from "../services/email.service.js";
import jwtService from "../services/jwt.service.js";
import { RouteHandler } from "../types.js";

// def user pwd: 'abc'

const login = asyncWrapper(async (req, res) => {
  const { ffe_id, pwd } = req.body as { ffe_id: string; pwd: string; };
  const player = await playerModel.getPlayer({ ffe_id });

  if (!player || !bcryptjs.compareSync(pwd, player.pwd))
    return res.json(null);

  res.json(jwtService.createToken(player));
});

const decodeToken = asyncWrapper(async (req, res) => {
  const { auth_token } = req.body;
  res.json(await jwtService.decodeToken(auth_token));
});

const passwordForgotten: RouteHandler = async (req, res) => {
  const data = req.body;
  const { ffe_id } = data as { ffe_id: string; };
  const player = await playerModel.getPlayer({ ffe_id });

  if (!player)
    return res.json({
      errors: ["Adresse email invalide."]
    });

  const passwordResetId = randomBytes(32).toString("hex");
  await playerModel.updatePlayer({ ffe_id }, { pwd_reset_id: passwordResetId });
  const sendResult = await emailService.sendEmail({
    templateName: "password-reset",
    to: player.email,
    subject: "Réinitialisation du mot de passe",
    context: {
      link: `${config.CLIENT_URL}/nouveau-mot-de-passe/${passwordResetId}`
    }
  });
  res.json({ success: !!sendResult });
};

const passwordReset: RouteHandler = async (req, res) => {
  const player = await playerModel.getPlayer({ pwd_reset_id: req.params.passwordResetId });

  if (!player)
    return res.json({
      errors: ["Id de réinitialisation invalide."]
    });

  const { password1, password2 } = req.body;

  if (!password2 || password1 !== password2)
    return res.json({
      errors: ["Mot de passe invalide."]
    });

  const salt = await bcryptjs.genSalt(10);
  await playerModel.updatePlayer({ ffe_id: player.ffe_id }, {
    pwd: await bcryptjs.hash(password2, salt),
    pwd_reset_id: null
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
  decodeToken,
  passwordForgotten,
  passwordReset
};