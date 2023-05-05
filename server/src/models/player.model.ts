import { ZodError, z } from "zod";
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
  email: z.string({ required_error: "Email requis." }).email("Email invalide."),
  firstName: z.string({ required_error: "Prénom requis." }).nonempty(),
  lastName: z.string({ required_error: "NOM de famille requis." }).nonempty(),
  teams: z.array(z.string()).optional(),
  rating: z.number({ required_error: "Elo requis." }).positive(),
  fideId: z.number({ invalid_type_error: "N° FIDE invalide." }).int().optional(),
  isAdmin: z.boolean().optional(),
  isCaptain: z.boolean().optional(),
  phone: z.string().optional(),
  phone2: z.string().optional(),
  birthDate: z.string().optional(),
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