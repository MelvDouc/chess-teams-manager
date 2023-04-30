import { PlayerRole } from "@src/types.js";

const playerRoles = ["ADMIN", "CAPTAIN", "USER"] as Readonly<PlayerRole[]>;

const roleTranslations = {
  ADMIN: "Admin",
  CAPTAIN: "Capitaine",
  USER: "Utilisateur"
} as const;

export default playerRoles;
export { roleTranslations };