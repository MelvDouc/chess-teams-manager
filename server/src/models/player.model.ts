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

type PlayerFilter = Partial<Player>;

// const createPlayerSchema = z.object({
//   ffeId: z.string(),
//   fideId: z.number().or(z.null()),
//   email: z.string(),
//   role: z.enum(["ADMIN", "CAPTAIN", "USER"]),
//   pwd: z.string(),
//   phone: z.string().or(z.null()),
//   firstName: z.string(),
//   lastName: z.string(),
//   rating: z.number().or(z.null())
// });

// const updatePlayerSchema = createPlayerSchema.partial();

function getPlayer(filter: PlayerFilter): Promise<WithId<Player> | null> {
  return collections.players.findOne(filter);
}

function getPlayers(): Promise<WithId<Player>[]> {
  return collections.players.find().toArray();
}

function createPlayer(data: Omit<Player, "pwdResetId">): Promise<InsertOneResult<Player>> {
  return collections.players.insertOne(data);
}

function updatePlayer(filter: PlayerFilter, updates: UpdateFilter<Omit<Player, "ffe_id">>): Promise<UpdateResult<Player>> {
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
  deletePlayer
};