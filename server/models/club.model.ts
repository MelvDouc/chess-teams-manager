import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

async function getClub(id: DbEntities.Club["id"]): Promise<DbEntities.Club | null> {
  const search = await db.query("SELECT * FROM club WHERE id = ?", [id]);
  return search[0] ?? null;
}

function getClubs(): Promise<DbEntities.Club[]> {
  return db.query("SELECT * FROM club");
}

function createClub({ name, address, phone, email }: Omit<DbEntities.Club, "id">) {
  return db.insert("club", { name, address, phone, email });
}

function updateClub(id: DbEntities.Club["id"], updates: Partial<Omit<DbEntities.Club, "id">>) {
  const placeholders = Object.keys(updates).map((key) => `${key}=?`).join();
  return db.execute(
    `UPDATE club SET ${placeholders} WHERE id = ?`, [...Object.values(updates), id]
  );
}

function deleteClub(id: DbEntities.Club["id"]) {
  return db.execute("DELETE FROM club WHERE id = ?", [id]);
}

export default {
  getClub,
  getClubs,
  createClub,
  updateClub,
  deleteClub
};