import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short"
});

const getSeasons = () => db.execute(`SELECT DISTINCT season FROM league_match`);

const getMatchesOfSeason = (season: number) => {
  return db.execute(`
    SELECT
      t.name teamName,
      round,
      hc.address,
      IF(wc.id = 1, 1, 0) whiteOnOdds,
      opp.name opponent,
      date
    FROM league_match lm
      JOIN team t ON t.id = lm.teamId
      JOIN club hc ON hc.id = lm.homeClubId
      JOIN club wc ON wc.id = lm.whiteClubId
      JOIN club opp ON opp.id = lm.opponentId
    WHERE season = ?
      ORDER BY teamName
  `, [season]);
};

const getLineUp = async (season: number, round: number, teamId: number) => {
  return db.execute(`
  SELECT
    CONCAT(board, IF(board % 2 = (lm.homeClubId = 1), "B", "N")),
    ffeId,
    firstName,
    lastName
  FROM player line_up l
    JOIN player p ON p.ffeId = l.playerFfeId
    JOIN league_match lm ON lm.id = l.matchId
  WHERE season = ?
    AND round = ?
    AND teamId = ?
  ORDER BY l.board
  `, [season, round, teamId]);
};

export default {
  getSeasons,
  getMatchesOfSeason,
  getLineUp,
};