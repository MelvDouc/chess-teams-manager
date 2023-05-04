import { default as jwt } from "jsonwebtoken";
import config from "../config/config.js";
import { PlayerData } from "../types.js";

function createToken({ ffeId, role }: PlayerData): string {
  return jwt.sign({ ffeId, role }, config.JWT_SECRET, {
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
        || typeof decoded["role"] !== "number"
      )
        return resolve(null);

      resolve({ ffeId: decoded["ffeId"], role: decoded["role"] });
    });
  });
}

export default {
  createToken,
  decodeToken,
};