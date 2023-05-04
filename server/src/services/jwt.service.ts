import { default as jwt } from "jsonwebtoken";
import config from "../config/config.js";
import { PlayerData } from "../types.js";

function createToken({ ffeId, isAdmin, isCaptain }: PlayerData): string {
  const payload = { ffeId } as PlayerData;
  if (isAdmin) payload.isAdmin = true;
  if (isCaptain) payload.isCaptain = true;

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1y"
  });
}

function decodeToken(token: string): Promise<PlayerData | null> {
  return new Promise((resolve) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err)
        return resolve(null);

      if (
        typeof decoded !== "object"
        || decoded === null
        || typeof decoded["ffeId"] !== "string"
      )
        return resolve(null);

      resolve(decoded as PlayerData);
    });
  });
}

export default {
  createToken,
  decodeToken,
};