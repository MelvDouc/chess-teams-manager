import db from "../database/db.js";
import { PublicEntities, MySqlEntities, WithoutId } from "../types.js";

// ===== ===== ===== ===== =====
// HELPERS
// ===== ===== ===== ===== =====

function getRawTeam() {
  return db
    .createQueryBuilder()
    .select(
      "t.id id",
      "t.name name",
      "cap.ffe_id ffe_id",
      "cap.fide_id fide_id",
      "cap.role role",
      "cap.email email",
      "cap.phone phone",
      "cap.first_name first_name",
      "cap.last_name last_name",
      "cap.rating rating",
    )
    .from("team t")
    .join("left", "player cap")
    .on("cap.ffe_id = t.captain_ffe_id");
}

function convertSearch({ id, name, captain_ffe_id, ...captain }: MySqlEntities.Team & MySqlEntities.Player): PublicEntities.Team {
  return ({
    id,
    name,
    captain
  });
}

// ===== ===== ===== ===== =====
// CRUD
// ===== ===== ===== ===== =====

async function getTeam(name: string): Promise<PublicEntities.Team | null> {
  const [team] = await getRawTeam().where({ "t.name": name }).run() as unknown as MySqlEntities.TeamWithCaptain[];
  return (team)
    ? convertSearch(team)
    : null;
}

async function getTeams(): Promise<PublicEntities.Team[]> {
  const teams = await getRawTeam().run() as unknown as MySqlEntities.TeamWithCaptain[];
  return teams.map(convertSearch);
}

function createTeam({ name, captain_ffe_id }: WithoutId<MySqlEntities.Team>) {
  return db.insert("team", { name, captain_ffe_id });
}

function updateTeam(id: PublicEntities.Team["id"], updates: Partial<WithoutId<MySqlEntities.Team>>) {
  return db.update<PublicEntities.Team>("team", { id }, updates);
}

function deleteTeam(id: PublicEntities.Team["id"]) {
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