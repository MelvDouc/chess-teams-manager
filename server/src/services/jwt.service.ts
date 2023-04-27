import { default as jwt } from "jsonwebtoken";
import config from "../config/config.js";
import { PlayerData, PlayerRole } from "../types.js";

const Roles = ["ADMIN", "CAPTAIN", "USER"] as const;

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

      const { ffeId, role } = decoded as { ffeId: unknown; role: unknown; };

      if (typeof ffeId !== "string" || !Roles.includes(role as PlayerRole))
        return resolve(null);

      resolve({ ffeId, role: role as PlayerRole });
    });
  });
}

export default {
  createToken,
  decodeToken,
};