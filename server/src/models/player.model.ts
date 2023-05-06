import { z } from "zod";
import { collections } from "../database/db.js";
import {
  DeleteResult,
  InsertOneResult,
  Player,
  UpdateFilter,
  UpdateResult,
  WithId
} from "../types.js";

const playerSchema = z.object({
  ffeId: z.string({ required_error: "N° FFE requis." }).regex(/^[A-Z]\d+/, "N° FFE invalide."),
  fideId: z
    .number({ invalid_type_error: "N° FIDE invalide." })
    .int("Le n° FIDE ne peut être un nombre décimal.")
    .nonnegative("Le n° FIDE ne peut pas être un nombre négatif.")
    .optional(),
  firstName: z
    .string({
      required_error: "Prénom requis.",
      invalid_type_error: "Prénom invalide."
    })
    .nonempty("Prénom requis."),
  lastName: z
    .string({
      required_error: "Nom de famille requis.",
      invalid_type_error: "Nom de famille invalide."
    })
    .nonempty("Nom de famille requis."),
  email: z
    .string({
      required_error: "Email requis.",
      invalid_type_error: "Email invalide."
    })
    .email("Email invalide."),
  phone1: z.string({ invalid_type_error: "N° de téléphone invalide." }).optional(),
  phone2: z.string({ invalid_type_error: "N° de téléphone invalide." }).optional(),
  birthDate: z.string({ invalid_type_error: "Date de naissance invalide." }).optional(),
  rating: z
    .number({ invalid_type_error: "Classement Elo invalide." })
    .nonnegative("Le classement Elo doit être un nombre positif.")
    .optional(),
  teams: z.array(z.string(), { invalid_type_error: "Liste d'équipes invalide." }).optional(),
  isAdmin: z.boolean({ invalid_type_error: "Rôle invalide." }).optional(),
  isCaptain: z.boolean({ invalid_type_error: "Rôle invalide." }).optional(),
});

const updateSchema = z.optional(playerSchema);

function getPlayer(filter: PlayerFilter): Promise<WithId<Player> | null> {
  return collections.players.findOne(filter);
}

function getPlayers(): Promise<WithId<Player>[]> {
  return collections.players.find().toArray();
}

function createPlayer(data: Omit<Player, "pwdResetId">): Promise<InsertOneResult<Player>> {
  return collections.players.insertOne(data);
}

function updatePlayer(filter: PlayerFilter, updates: UpdateFilter<Omit<Player, "ffeId">>): Promise<UpdateResult<Player>> {
  return collections.players.updateOne(filter, updates as any);
}

function deletePlayer(filter: PlayerFilter): Promise<DeleteResult> {
  return collections.players.deleteOne(filter);
}

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getNewPlayerErrors: (player: Player): string[] | null => {
    const parsed = playerSchema.safeParse(player);
    return (parsed.success)
      ? null
      : parsed.error.errors.map((e) => e.message);
  },
  getPlayerUpdateErrors: (player: Player): string[] | null => {
    const parsed = updateSchema.safeParse(player);
    return (parsed.success)
      ? null
      : parsed.error.errors.map((e) => e.message);
  },
};

type PlayerFilter = Partial<Player>;