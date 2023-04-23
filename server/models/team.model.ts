import db from "/database/db.ts";
import { DbEntities, MySqlEntities, WithoutId } from "/types.ts";

function getRawTeam() {
  return db
    .createQueryBuilder()
    .select(
      "t.id team_id",
      "t.name team_name",
      "cap.ffe_id captain_ffe_id",
      "cap.fide_id captain_fide_id",
      "cap.email captain_email",
      "cap.phone captain_phone",
      "cap.last_name captain_last_name",
      "cap.first_name captain_first_name",
      "cap.rating captain_rating",
    ).from("team t")
    .innerJoin("player cap")
    .on("cap.ffe_id = t.captain_ffe_id");
}

const convertSearch = (search: MySqlEntities.TeamWithCaptain): DbEntities.Team => ({
  id: search.team_id,
  name: search.team_name,
  captain: {
    ffe_id: search.captain_ffe_id,
    fide_id: search.captain_fide_id,
    email: search.captain_email,
    first_name: search.captain_first_name,
    last_name: search.captain_last_name,
    phone: search.captain_phone,
    rating: search.captain_rating
  }
});

async function getTeam(name: string): Promise<DbEntities.Team | null> {
  const [team] = await getRawTeam().where({ "t.name": "?" }).run([name]) as MySqlEntities.TeamWithCaptain[];
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

export default {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
};