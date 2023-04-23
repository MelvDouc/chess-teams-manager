import db from "/database/db.ts";
import { BoardColor, DbEntities, MySqlEntities, WithoutId } from "/types.ts";

const fullMatchInfoSql = `
  SELECT
    lm.id id,
    season,
    round,
    white_on_odds,
    lm.date date,
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
  FROM league_match lm
  JOIN club hc ON hc.id = lm.home_club_id
  JOIN club opp ON opp.id = lm.opponent_id
  JOIN team ON team.id = lm.team_id
  JOIN player cap ON cap.ffe_id = team.captain_ffe_id
`;

const lineUpSql = `
  SELECT
    board,
    IF(board % 2 = lm.white_on_odds, "B", "N") color,
    p.ffe_id ffe_id,
    p.fide_id fide_id,
    p.email email,
    p.first_name first_name,
    p.last_name last_name,
    p.phone phone,
    IF(player_rating IS NULL, p.rating, player_rating) rating
  FROM line_up l
  INNER JOIN league_match lm
    ON lm.id = l.match_id
  INNER JOIN player p
    ON p.ffe_id = l.player_ffe_id
  INNER JOIN team t
    ON t.id = lm.team_id
  WHERE l.match_id = ?
  ORDER BY board
`;

const convertSearch = (search: MySqlEntities.FullMatchInfo): DbEntities.Match => ({
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
  const [match] = await db.query(`${fullMatchInfoSql} WHERE season = ? AND round = ? AND team.name = ?`, [
    season, round, teamName
  ]);
  return (match)
    ? convertSearch(match)
    : null;
}

async function getSeasons(): Promise<number[]> {
  const seasons = await db.query("SELECT DISTINCT season FROM league_match");
  return seasons.map((obj: { season: number; }) => obj.season);
}

async function getMatchesOfSeason(season: number): Promise<DbEntities.Match[]> {
  const search = await db.query(`${fullMatchInfoSql} WHERE season = ?`, [season]) as MySqlEntities.FullMatchInfo[];
  return search.map(convertSearch);
}

async function getLineUp({ season, round, teamName }: {
  season: number;
  round: number;
  teamName: string;
}): Promise<DbEntities.LineUp | null> {
  const [match] = await db.query(`
    SELECT lm.id, white_on_odds
    FROM league_match lm
    INNER JOIN team t
      ON t.id = lm.team_id
    WHERE lm.season = ?
      AND lm.round = ?
      AND t.name = ?
    LIMIT 1
  `, [season, round, teamName]) as Pick<MySqlEntities.Match, "id" | "white_on_odds">[];

  if (!match)
    return null;

  const rawLineUp = await db.query(lineUpSql, [match.id]) as ({
    board: number;
    color: BoardColor;
  } & DbEntities.Player)[];
  const boardMap = rawLineUp.reduce((acc, { board, color, ...player }) => {
    return acc.set(board, { color, player });
  }, new Map<number, { color: BoardColor; player: DbEntities.Player; }>());

  return Array.from({ length: 8 }, (_, i) => {
    const board = i + 1;

    return {
      board,
      color: boardMap.get(board)?.color ?? ((board % 2 === match.white_on_odds) ? "B" : "N"),
      player: boardMap.get(board)?.player ?? null
    };
  });
}

function createMatch({ season, round, team_id, opponent_id, home_club_id, white_on_odds, date }: MySqlEntities.Match) {
  const d = new Date(date);
  const dateString = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:00`;

  return db.insert<WithoutId<MySqlEntities.Match>>("league_match", {
    season,
    round,
    team_id,
    opponent_id,
    home_club_id,
    white_on_odds: Number(white_on_odds) as 0 | 1,
    date: dateString
  });
}

function updateMatch(id: number, updates: WithoutId<MySqlEntities.Match>) {
  return db.update<MySqlEntities.Match>("league_match", { id }, updates);
}

function deleteMatch(id: number) {
  return db.delete("league_match", { id });
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
  deleteMatch
};