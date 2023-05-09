import { randomBytes } from "node:crypto";
import { default as bcryptjs } from "bcryptjs";
import asyncWrapper from "../middleware/async-wrapper.js";
import playerModel from "../models/player.model.js";
import emailService from "../services/email.service.js";
import jwtService from "../services/jwt.service.js";

const logIn = asyncWrapper(async (req, res) => {
  const { ffeId, pwd } = req.body as { ffeId: string; pwd: string; };
  const player = await playerModel.getPlayer({ ffeId });

  if (!player || !(await bcryptjs.compare(pwd, player.pwd ?? "")))
    return res.json(null);

  res.json(jwtService.createToken(player));
});

const decodeToken = asyncWrapper(async (req, res) => {
  const { auth_token } = req.body;
  res.json(await jwtService.decodeToken(auth_token));
});

const passwordForgotten = asyncWrapper(async (req, res) => {
  const { ffeId, baseUrl } = req.body as { ffeId: string; baseUrl: string; };
  const player = await playerModel.getPlayer({ ffeId });

  if (!player)
    return res.json({ success: false, errors: [] });

  const pwdResetId = randomBytes(32).toString("hex");
  await playerModel.updatePlayer({ ffeId }, {
    $set: { pwdResetId }
  });
  const sendResult = await emailService.sendEmail({
    templateName: "password-reset",
    to: player.email,
    subject: "Réinitialisation du mot de passe",
    context: {
      link: baseUrl + pwdResetId
    }
  });
  res.json({ success: !!sendResult });
});

const passwordReset = asyncWrapper(async (req, res) => {
  const player = await playerModel.getPlayer({ pwdResetId: req.params.pwdResetId });

  if (!player)
    return res.json({
      errors: ["ID de réinitialisation invalide."]
    });

  const { pwd1, pwd2 } = req.body;

  if (!pwd2)
    return res.json({ errors: ["Veuillez confirmer le mot de passe."] });
  if (pwd1 !== pwd2)
    return res.json({ errors: ["Les mots de passe ne se correspondent pas."] });

  const salt = await bcryptjs.genSalt(10);
  await playerModel.updatePlayer({ ffeId: player.ffeId }, {
    $set: {
      pwd: await bcryptjs.hash(pwd2, salt)
    },
    $unset: {
      pwdResetId: ""
    }
  });
  res.json({ success: true });
});


export default {
  logIn,
  decodeToken,
  passwordForgotten,
  passwordReset
};