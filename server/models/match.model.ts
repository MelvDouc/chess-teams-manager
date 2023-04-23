import db from "/database/db.ts";
import { BoardColor, DbEntities, MySqlEntities, WithoutId } from "/types.ts";

// ===== ===== ===== ===== =====
// HELPERS
// ===== ===== ===== ===== =====

async function getMatchIdAndWhiteOnOdds({ season, round, teamName }: MySqlEntities.ShortMatchInfo) {
  const matches = await db
    .createQueryBuilder()
    .select("lm.id", "white_on_odds")
    .from("league_match lm")
    .join("left", "team t")
    .on("t.id = lm.team_id")
    .where({
      "lm.season": "?",
      "lm.round": "?",
      "t.name": "?"
    })
    .limit(1)
    .run([season, round, teamName]) as Pick<MySqlEntities.Match, "id" | "white_on_odds">[];
  return matches[0];
}

function getFullMatchInfo() {
  return db
    .createQueryBuilder()
    .select(
      "lm.id id",
      "season",
      "round",
      "white_on_odds",
      "lm.date date",
      "hc.address address",
      "team.id team_id",
      "team.name team_name",
      "cap.ffe_id captain_ffe_id",
      "cap.fide_id captain_fide_id",
      "cap.email captain_email",
      "cap.phone captain_phone",
      "cap.last_name captain_last_name",
      "cap.first_name captain_first_name",
      "cap.rating captain_rating",
      "opp.id opponent_id",
      "opp.name opponent_name",
      "opp.address opponent_address",
      "opp.email opponent_email",
      "opp.phone opponent_phone",
    )
    .from("league_match lm")
    .join("left", "club hc")
    .on("hc.id = lm.home_club_id")
    .join("left", "club opp")
    .on("opp.id = lm.opponent_id")
    .join("left", "team")
    .on("team.id = lm.team_id")
    .join("left", "player cap")
    .on("cap.ffe_id = team.captain_ffe_id");
}

function convertSearch(search: MySqlEntities.FullMatchInfo): DbEntities.Match {
  return {
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
  };
}

function getRawLineUp(matchId: number) {
  return db
    .createQueryBuilder()
    .select(
      "board",
      "IF(board % 2 = lm.white_on_odds, 'B', 'N') color",
      "p.ffe_id ffe_id",
      "p.fide_id fide_id",
      "p.email email",
      "p.first_name first_name",
      "p.last_name last_name",
      "p.phone phone",
      "l.player_rating rating",
    )
    .from("line_up l")
    .join("left", "league_match lm")
    .on("lm.id = l.match_id")
    .join("left", "player p")
    .on("p.ffe_id = l.player_ffe_id")
    .join("left", "team t")
    .on("t.id = lm.team_id")
    .where({ "l.match_id": "?" })
    .orderBy("board")
    .run([matchId]) as Promise<({ board: number; color: BoardColor; } & DbEntities.Player)[]>;
}

// ===== ===== ===== ===== =====
// CRUD
// ===== ===== ===== ===== =====

async function getMatch({ season, round, teamName }: MySqlEntities.ShortMatchInfo): Promise<DbEntities.Match | null> {
  const [match] = await getFullMatchInfo()
    .where({
      season: "?",
      round: "?",
      "t.name": "?"
    })
    .run([season, round, teamName]);
  return (match)
    ? convertSearch(match)
    : null;
}

async function getMatchesOfSeason(season: number): Promise<DbEntities.Match[]> {
  const search = await getFullMatchInfo().run();
  return search.map(convertSearch);
}

async function getSeasons(): Promise<number[]> {
  const seasons = await db.createQueryBuilder().select("DISTINCT season").from("league_match").run();
  return seasons.map((obj: { season: number; }) => obj.season);
}

async function getLineUp({ season, round, teamName }: MySqlEntities.ShortMatchInfo): Promise<DbEntities.LineUp | null> {
  const match = await getMatchIdAndWhiteOnOdds({ season, round, teamName });

  if (!match)
    return null;

  const rawLineUp = await getRawLineUp(match.id);
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