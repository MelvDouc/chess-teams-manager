import db from "/database/db.ts";
import { DbEntities, MySqlEntities, WithoutId } from "/types.ts";

// ===== ===== ===== ===== =====
// HELPERS
// ===== ===== ===== ===== =====

function getRawTeam() {
  return db
    .createQueryBuilder()
    .select("*")
    .from("team t")
    .join("left", "player cap")
    .on("cap.ffe_id = t.captain_ffe_id");
}

function convertSearch({ id, name, captain_ffe_id, ...captain }: MySqlEntities.Team & MySqlEntities.Player): DbEntities.Team {
  return ({
    id,
    name,
    captain
  });
}

// ===== ===== ===== ===== =====
// CRUD
// ===== ===== ===== ===== =====

async function getTeam(name: string): Promise<DbEntities.Team | null> {
  const [team] = await getRawTeam().where({ "t.name": name }).run() as MySqlEntities.TeamWithCaptain[];
  return (team)
    ? convertSearch(team)
    : null;
}

async function getTeams(): Promise<DbEntities.Team[]> {
  const teams = await getRawTeam().run() as MySqlEntities.TeamWithCaptain[];
  return teams.map(convertSearch);
}

function createTeam({ name, captain_ffe_id }: WithoutId<MySqlEntities.Team>) {
  return db.insert("team", { name, captain_ffe_id });
}

function updateTeam(id: DbEntities.Team["id"], updates: WithoutId<MySqlEntities.Team>) {
  return db.update<DbEntities.Team>("team", { id }, updates);
}

function deleteTeam(id: DbEntities.Team["id"]) {
  return db.delete("team", { id });
}

// ===== ===== ===== ===== =====
// EXPORTS
// ===== ===== ===== ===== =====

export default {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
};