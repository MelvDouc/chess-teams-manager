import db from "../database/db.js";
import { PublicEntities, MySqlEntities, SqlRecord, WithoutId } from "../types.js";

function getPlayer(filter: SqlRecord): Promise<MySqlEntities.Player | null> {
  return db.findOne("player", filter);
}

function getPlayers(): Promise<MySqlEntities.Player[]> {
  return db
    .createQueryBuilder()
    .select("*")
    .from("player")
    .orderBy("rating DESC")
    .run() as unknown as Promise<MySqlEntities.Player[]>;
}

function createPlayer(data: MySqlEntities.Player) {
  return db.insert("player", data);
}

function updatePlayer(filter: SqlRecord, updates: Partial<WithoutId<MySqlEntities.Player, "ffe_id">>) {
  return db.update<PublicEntities.Player>("player", filter, updates);
}

function deletePlayer(filter: SqlRecord) {
  return db.delete("player", filter);
}

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};