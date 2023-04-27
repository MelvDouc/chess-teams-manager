import { default as jwt } from "jsonwebtoken";
import config from "../config/config.js";
import { UserData, UserRole } from "../types.js";

const Roles = ["ADMIN", "CAPTAIN", "USER"] as const;

function createToken({ email, role }: UserData): string {
  return jwt.sign({ email, role }, config.JWT_SECRET, {
    expiresIn: "1y"
  });
}

function decodeToken(token: string): Promise<UserData | null> {
  return new Promise((resolve) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err)
        return resolve(null);

      const { email, role } = decoded as { email: unknown; role: unknown; };

      if (typeof email !== "string" || !Roles.includes(role as UserRole))
        return resolve(null);

      resolve({ email, role: role as UserRole });
    });
  });
}

export default {
  createToken,
  decodeToken,
};