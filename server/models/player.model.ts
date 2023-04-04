import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

const getPlayer = async (filter: Partial<DbEntities.Player>) => {
  const keys = Object.keys(filter);

  return (await db.execute(`
    SELECT * FROM player WHERE ${keys.map(k => k + " = ?").join(" AND ")} LIMIT 1
  `, Object.values(filter)))?.at(0);
};

const getPlayers = () => db.execute("SELECT * FROM player");

const createPlayer = (player: DbEntities.Player) => {
  return db.execute(`
    INSERT INTO player (ffeId, fideId, email, lastName, firstName, phone) VALUES (?, ?, ?, ?, ?, ?)
  `, [player.ffeId, player.ffeId, player.email, player.lastName, player.firstName, player.phone ?? null]);
};

const updatePlayer = (ffeId: string, { fideId, email, lastName, firstName, phone }: Partial<DbEntities.Player>) => {
  return db.execute(`
    UPDATE player SET fideId = ?, email = ?, lastName = ?, firstName = ?, phone = ? WHERE ffeId = ?
  `, [fideId, email, lastName, firstName, phone, ffeId]);
};

const deletePlayer = (ffeId: string) => db.execute("DELETE FROM player WHERE ffeId = ?", [ffeId]);


export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};