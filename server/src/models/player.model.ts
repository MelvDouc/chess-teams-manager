import db from "../database/db.js";
import { DbEntities, MySqlEntities, WithoutId } from "../types.js";

function getPlayer(ffeId: string): Promise<MySqlEntities.Player | null> {
  return db.findOne("player", { ffe_id: ffeId });
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

function updatePlayer(ffe_id: DbEntities.Player["ffe_id"], updates: Partial<WithoutId<MySqlEntities.Player, "ffe_id">>) {
  return db.update<DbEntities.Player>("player", { ffe_id }, updates);
}

function deletePlayer(ffe_id: DbEntities.Player["ffe_id"]) {
  return db.delete("player", { ffe_id });
}

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};