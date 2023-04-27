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

function getPlayer(filter: PlayerFilter): Promise<WithId<Player> | null> {
  return collections.players.findOne(filter);
}

function getPlayers(): Promise<WithId<Player>[]> {
  return collections.players.find().toArray();
}

function createPlayer(data: Player): Promise<InsertOneResult<Player>> {
  return collections.players.insertOne(data);
}

function updatePlayer(filter: PlayerFilter, updates: UpdateFilter<Omit<Player, "ffe_id">>): Promise<UpdateResult<Player>> {
  return collections.players.updateOne(filter, updates);
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