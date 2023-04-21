import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

function getPlayer(ffeId: string): Promise<DbEntities.Player | null> {
  return db.findOne("player", { ffe_id: ffeId });
}

function getPlayers() {
  return db.findAll("player");
}

function createPlayer({ ffe_id, fide_id, email, phone, first_name, last_name, rating }: DbEntities.Player) {
  return db.insert("player", {
    ffe_id,
    fide_id,
    email,
    phone,
    first_name,
    last_name,
    rating
  });
}

function updatePlayer(ffe_id: DbEntities.Player["ffe_id"], updates: Partial<Omit<DbEntities.Player, "ffe_id">>) {
  return db.update<DbEntities.Player>("player", { ffe_id }, updates);
}

function deletePlayer(ffe_id: DbEntities.Player["ffe_id"]) {
  return db.execute("DELETE FROM player WHERE ffe_id = ?", [ffe_id]);
}

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};