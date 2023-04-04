import type { ObjectId } from "mongo";
import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

const getPlayer = (filter: Partial<DbEntities.Player>) => db.players.findOne(filter);
const getPlayers = () => db.players.find().toArray();
const createPlayer = (player: DbEntities.Player) => db.players.insertOne(player) as Promise<ObjectId>;
const updatePlayer = (ffeId: string, updates: Partial<DbEntities.Player>) => db.players.updateOne({ ffeId }, {
  $set: updates
});
const deletePlayer = (ffeId: string) => db.players.deleteOne({ ffeId });


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};