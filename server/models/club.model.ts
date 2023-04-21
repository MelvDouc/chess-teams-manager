import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

function getClub(id: DbEntities.Club["id"]): Promise<DbEntities.Club | null> {
  return db.findOne("club", { id });
}

function getClubs(): Promise<DbEntities.Club[]> {
  return db.findAll("club");
}

function createClub({ name, address, phone, email }: Omit<DbEntities.Club, "id">) {
  return db.insert("club", { name, address, phone, email });
}

function updateClub(id: DbEntities.Club["id"], updates: Partial<Omit<DbEntities.Club, "id">>) {
  return db.update<DbEntities.Club>("club", { id }, updates);
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