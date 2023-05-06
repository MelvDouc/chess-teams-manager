import { playerSchema, updateSchema } from "./player.schema.js";
import { collections } from "../database/db.js";
import {
  DeleteResult,
  InsertOneResult,
  Player,
  UpdateFilter,
  UpdateResult,
  WithId
} from "../types.js";

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
  parseNewPlayer: (player: Player): [Omit<Player, "pwd">, null] | [null, string[]] => {
    const parsed = playerSchema.safeParse(player);
    return (parsed.success)
      ? [parsed.data, null]
      : [null, parsed.error.errors.map((e) => e.message)];
  },
  parsePlayerUpdates: (player: Player): [Partial<Omit<Player, "ffeId">>, null] | [null, string[]] => {
    const parsed = updateSchema.safeParse(player);
    return (parsed.success)
      ? [parsed.data, null]
      : [null, parsed.error.errors.map((e) => e.message)];
  },
};

type PlayerFilter = Partial<Player>;