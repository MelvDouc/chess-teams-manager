import db from "../database/db.js";
import { BoardColor, DbEntities, MySqlEntities, WithoutId } from "../types.js";

// ===== ===== ===== ===== =====
// HELPERS
// ===== ===== ===== ===== =====

function getFullMatchInfo() {
  return db
    .createQueryBuilder()
    .select(
      "lm.id id",
      "season",
      "round",
      "white_on_odds",
      "lm.date date",
      "lm.time time",
      "t.id team_id",
      "t.name team_name",
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
      "hc.id hc_id",
      "hc.name hc_name",
      "hc.address hc_address",
      "hc.email hc_email",
      "hc.phone hc_phone",
    )
    .from("league_match lm")
    .join("inner", "club hc")
    .on("hc.id = lm.home_club_id")
    .join("inner", "club opp")
    .on("opp.id = lm.opponent_id")
    .join("inner", "team t")
    .on("t.id = lm.team_id")
    .join("inner", "player cap")
    .on("cap.ffe_id = t.captain_ffe_id");
}

function convertSearch(search: MySqlEntities.FullMatchInfo): DbEntities.Match {
  return {
    id: search.id,
    season: search.season,
    round: search.round,
    white_on_odds: Boolean(search.white_on_odds),
    date: search.date,
    time: search.time,
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
      phone: search.opponent_phone
    },
    home_club: {
      id: search.hc_id,
      name: search.hc_name,
      address: search.hc_address,
      email: search.hc_email,
      phone: search.hc_phone
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
    .join("inner", "league_match lm")
    .on("lm.id = l.match_id")
    .join("inner", "player p")
    .on("p.ffe_id = l.player_ffe_id")
    .join("inner", "team t")
    .on("t.id = lm.team_id")
    .where({ "l.match_id": matchId })
    .orderBy("board")
    .run() as Promise<({ board: number; color: BoardColor; } & DbEntities.Player)[]>;
}

// ===== ===== ===== ===== =====
// CRUD
// ===== ===== ===== ===== =====

async function getMatch({ season, round, teamName }: MySqlEntities.ShortMatchInfo): Promise<DbEntities.Match | null> {
  const [match] = await getFullMatchInfo()
    .where({
      $and: {
        season,
        round,
        "t.name": teamName
      }
    })
    .run() as unknown as MySqlEntities.FullMatchInfo[];
  return (match)
    ? convertSearch(match)
    : null;
}

async function getMatchesOfSeason(season: number): Promise<DbEntities.Match[]> {
  const search = await getFullMatchInfo().where({ season }).run() as unknown as MySqlEntities.FullMatchInfo[];
  return search.map(convertSearch);
}

async function getSeasons(): Promise<number[]> {
  const seasons = await db
    .createQueryBuilder()
    .select("DISTINCT season")
    .from("league_match")
    .run() as unknown as { season: number; }[];
  return seasons.map((obj) => obj.season);
}

async function getLineUp({ season, round, teamName }: MySqlEntities.ShortMatchInfo): Promise<{
  match: DbEntities.Match;
  lineUp: DbEntities.LineUp;
} | null> {
  const match = await getMatch({ season, round, teamName });

  if (!match)
    return null;

  const rawLineUp = await getRawLineUp(match.id);
  const boardMap = rawLineUp.reduce((acc, { board, color, ...player }) => {
    return acc.set(board, { color, player });
  }, new Map<number, { color: BoardColor; player: DbEntities.Player; }>());

  return {
    match,
    lineUp: Array.from({ length: 8 }, (_, i) => {
      const board = i + 1;

      return {
        board,
        color: boardMap.get(board)?.color ?? (((board % 2 === 0) === match.white_on_odds) ? "B" : "N"),
        player: boardMap.get(board)?.player ?? null
      };
    })
  };
}

function createMatch({ season, round, team_id, opponent_id, home_club_id, white_on_odds, date, time }: MySqlEntities.Match) {
  return db.insert<WithoutId<MySqlEntities.Match>>("league_match", {
    season,
    round,
    team_id,
    opponent_id,
    home_club_id,
    white_on_odds: Number(white_on_odds) as 0 | 1,
    date,
    time
  });
}

function updateMatch(id: number, updates: Partial<WithoutId<MySqlEntities.Match>>) {
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