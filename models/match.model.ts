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

const getLineUp = async ({ playerFfeIds, whiteOnOdds }: DbEntities.Match) => {
  const players = await db.players().find({ ffeId: { $in: Object.values(playerFfeIds) } }).toArray();
  return Array.from({ length: 8 }, (_, i) => {
    const boardNo = i + 1;
    return {
      board: boardNo,
      color: ((boardNo % 2 === 1) === whiteOnOdds) ? "B" : "N",
      player: (boardNo in playerFfeIds) ? players.find(p => p.ffeId === playerFfeIds[boardNo])! : null
    };
  });
};

export default {
  getMatch,
  getSeasons,
  getMatchesOfSeason,
  getLineUp,
};