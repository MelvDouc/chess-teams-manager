import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

const fullMatchInfoSql = `
  SELECT
    league_match.id id,
    season,
    round,
    white_on_odds,
    league_match.date date,
    hc.address address,
    team.id team_id,
    team.name team_name,
    cap.ffe_id captain_ffe_id,
    cap.fide_id captain_fide_id,
    cap.email captain_email,
    cap.phone captain_phone,
    cap.last_name captain_last_name,
    cap.first_name captain_first_name,
    cap.rating captain_rating,
    opp.id opponent_id,
    opp.name opponent_name,
    opp.address opponent_address,
    opp.email opponent_email,
    opp.phone opponent_phone
  FROM league_match
  JOIN club hc ON hc.id = league_match.home_club_id
  JOIN club opp ON opp.id = league_match.opponent_id
  JOIN team ON team.id = league_match.team_id
  JOIN player cap ON cap.ffe_id = team.captain_ffe_id
`;

const convertSearch = (search: RawMatchSearch): DbEntities.Match => ({
  id: search.id,
  season: search.season,
  round: search.round,
  address: search.address,
  white_on_odds: Boolean(search.white_on_odds),
  date: new Date(search.date),
  team: {
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
  },
  opponent: {
    id: search.opponent_id,
    name: search.opponent_name,
    address: search.opponent_address,
    email: search.opponent_email,
    phone: search.opponent_phone,
  }
});

async function getMatch({ season, round, teamName }: {
  season: number;
  round: number;
  teamName: string;
}): Promise<DbEntities.Match | null> {
  const [search] = await db.query(
    `${fullMatchInfoSql} WHERE season = ? AND round = ? AND team.name = ?`,
    [season, round, teamName]
  ) as RawMatchSearch[];
  return (search)
    ? convertSearch(search)
    : null;
}

function getSeasons(): Promise<number[]> {
  return db.query("SELECT DISTINCT season FROM league_match");
}

async function getMatchesOfSeason(season: number): Promise<DbEntities.Match[]> {
  const search = await db.query(`${fullMatchInfoSql} WHERE season = ?`, [season]) as RawMatchSearch[];
  return search.map(convertSearch);
}

async function getLineUp({ season, round, teamName }: {
  season: number;
  round: number;
  teamName: string;
}): Promise<DbEntities.LineUp | null> {
  const [search] = await db.query(
    `${fullMatchInfoSql} WHERE season = ? AND round = ? AND team.name = ?`,
    [season, round, teamName]
  ) as RawMatchSearch[];

  if (!search)
    return null;

  const data = await db.query(`
    SELECT
      board,
      player_rating,
      IF((board % 2 = 1) = lm.white_on_odds, 'w', 'b') color,
      p.ffe_id ffe_id,
      p.fide_id fide_id,
      p.email email,
      p.phone phone,
      p.last_name last_name,
      p.first_name first_name,
      p.rating rating
    FROM line_up
    JOIN player p ON p.ffe_id = line_up.player_ffe_id
    JOIN league_match lm ON lm.id = line_up.match_id
    WHERE match_id = ?
  `, [search.id]) as ({ board: number; color: "w" | "b"; player_rating: number; } & DbEntities.Player)[];
  return data.map(({ board, color, player_rating, ...player }) => ({
    board,
    color,
    player: {
      ...player,
      rating: player_rating
    }
  }));
}

function createMatch({ season, round, team_id, opponent_id, home_club_id, white_on_odds, date }: DbMatch) {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

  return db.insert("league_match", {
    season,
    round,
    team_id,
    opponent_id,
    home_club_id,
    white_on_odds: Number(white_on_odds),
    date: dateString
  });
}

function updateMatch(id: number, updates: Partial<Omit<DbMatch, "id">>) {
  const placeholders = Object.keys(updates).map((key) => `${key}=?`).join();
  return db.execute(
    `UPDATE league_match SET ${placeholders} WHERE id = ?`,
    Object.values(updates).concat(id)
  );
}

function deleteMatch(id: number) {
  return db.execute("DELETE FROM league_match WHERE id = ?", [id]);
}

// ===== ===== ===== ===== =====
// ERRORS
// ===== ===== ===== ===== =====

function ensureMatch(data: DbMatch): DbMatch {
  return {
    season: parseInt(data.season as unknown as string),
    round: parseInt(data.round as unknown as string),
    opponent_id: parseInt(data.opponent_id as unknown as string),
    team_id: parseInt(data.team_id as unknown as string),
    home_club_id: parseInt(data.home_club_id as unknown as string),
    date: new Date(data.date),
    white_on_odds: "white_on_odds" in data
  };
}

// ===== ===== ===== ===== =====
// EXPORTS
// ===== ===== ===== ===== =====

export default {
  getMatch,
  getSeasons,
  getMatchesOfSeason,
  getLineUp,
  createMatch,
  updateMatch,
  deleteMatch,
  ensureMatch
};

// ===== ===== ===== ===== =====
// TYPES
// ===== ===== ===== ===== =====

interface RawMatchSearch {
  id: number;
  season: number;
  round: number;
  white_on_odds: number;
  date: string;
  address: string;
  team_id: number;
  team_name: string;
  captain_ffe_id: string;
  captain_fide_id: number | null;
  captain_email: string;
  captain_phone: string | null;
  captain_last_name: string;
  captain_first_name: string;
  captain_rating: number;
  opponent_id: number;
  opponent_name: string;
  opponent_address: string;
  opponent_email: string | null;
  opponent_phone: string | null;
}

interface DbMatch {
  season: number;
  round: number;
  team_id: number;
  opponent_id: number;
  home_club_id: number;
  white_on_odds: boolean;
  date: Date;
}