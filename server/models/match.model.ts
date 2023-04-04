import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short"
});

const getMatch = (filter: Pick<DbEntities.Match, "season" | "round" | "teamName">) => {
  return db.matches().findOne(filter);
};
const getSeasons = () => db.matches().distinct("season") as Promise<number[]>;
const getMatchesOfSeason = (season: number) => db.matches()
  .aggregate<{ teamName: string; matches: DbEntities.Match[]; }>([
    {
      $match: { season }
    },
    {
      $group: {
        _id: "$teamName",
        matches: { $push: "$$ROOT" }
      }
    },
    {
      $addFields: { teamName: "$_id" }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { teamName: 1 }
    }
  ])
  .map(({ teamName, matches }) => ({
    teamName,
    matches: matches.map(({ date, ...others }) => ({ ...others, date: dateFormatter.format(date) }))
  }));

const getLineUp = async ({ season, round, teamName }: { season: number; round: number; teamName: string; }) => {
  const match = await getMatch({ season, round, teamName });

  if (!match) {
    return Array.from({ length: 8 }, (_, i) => {
      const board = i + 1;
      return { board, color: "", player: null };
    });
  }

  const ffeIds = match.lineUp.map(element => element.ffeId);
  const players = await db.players().find({ ffeId: { $in: ffeIds } }).toArray();

  return Array.from({ length: 8 }, (_, i) => {
    const board = i + 1;
    const ffeIdIndex = match.lineUp.findIndex(element => element.board === board);

    return {
      board,
      color: ((board % 2 === 1) === match.whiteOnOdds) ? "B" : "N",
      player: (ffeIdIndex === -1) ? null : players.find(p => p.ffeId === ffeIds[ffeIdIndex])!
    };
  });
};

export default {
  getMatch,
  getSeasons,
  getMatchesOfSeason,
  getLineUp,
};