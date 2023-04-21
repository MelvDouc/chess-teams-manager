import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

const teamSql = `
  SELECT
    team.id team_id,
    team.name team_name,
    cap.ffe_id captain_ffe_id,
    cap.fide_id captain_fide_id,
    cap.email captain_email,
    cap.phone captain_phone,
    cap.last_name captain_last_name,
    cap.first_name captain_first_name,
    cap.rating captain_rating
  FROM team
  JOIN player cap ON cap.ffe_id = team.captain_ffe_id
`;

const convertSearch = (search: any) => ({
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

function getTeam(name: string): Promise<DbEntities.Team | null> {
  return db.findOne("team", { name });
}

async function getTeams(): Promise<DbEntities.Team[]> {
  const search = await db.query(teamSql);
  return search.map(convertSearch);
}

function createTeam({ name, captain_ffe_id }: {
  name: string;
  captain_ffe_id: number;
}) {
  return db.insert("team", { name, captain_ffe_id });
}

function updateTeam(id: DbEntities.Team["id"], updates: Partial<Omit<DbEntities.Team, "id">>) {
  return db.update<DbEntities.Team>("team", { id }, updates);
}

function deleteTeam(id: DbEntities.Team["id"]) {
  return db.execute("DELETE FROM team WHERE id = ?", [id]);
}

export default {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
};