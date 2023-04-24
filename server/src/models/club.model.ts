import db from "../database/db.js";
import { DbEntities, MySqlEntities, WithoutId } from "../types.js";

function getClub(id: DbEntities.Club["id"]): Promise<MySqlEntities.Club | null> {
  return db.findOne("club", { id });
}

function getClubs(): Promise<MySqlEntities.Club[]> {
  return db.findAll("club");
}

function createClub(data: WithoutId<MySqlEntities.Club>) {
  return db.insert("club", data);
}

function updateClub(id: DbEntities.Club["id"], updates: Partial<WithoutId<MySqlEntities.Club>>) {
  return db.update<DbEntities.Club>("club", { id }, updates);
}

function deleteClub(id: DbEntities.Club["id"]) {
  return db.delete("club", { id });
}

export default {
  getClub,
  getClubs,
  createClub,
  updateClub,
  deleteClub
};