import { default as jwt } from "jsonwebtoken";
import config from "../config/config.js";
import { UserData, UserRole } from "../types.js";

const Roles = ["ADMIN", "CAPTAIN", "USER"] as const;

function createToken({ ffe_id, role }: UserData): string {
  return jwt.sign({ ffe_id, role }, config.JWT_SECRET, {
    expiresIn: "1y"
  });
}

function decodeToken(token: string): Promise<UserData | null> {
  return new Promise((resolve) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err)
        return resolve(null);

      const { ffe_id, role } = decoded as { ffe_id: unknown; role: unknown; };

      if (typeof ffe_id !== "string" || !Roles.includes(role as UserRole))
        return resolve(null);

      resolve({ ffe_id, role: role as UserRole });
    });
  });
}

export default {
  createToken,
  decodeToken,
};