import type { ObjectId } from "mongo";
import db from "/database/db.ts";
import { DbEntities, Nullable } from "/types.ts";

const getSeasons = () => db.matches().distinct("season") as Promise<number[]>;
const getMatchesOfSeason = (season: number) => db.matches().aggregate([
  {
    $match: { season }
  },
  {
    $group: {
      _id: "$teamName",
      matches: {
        $push: "$$ROOT"
      }
    }
  },
  {
    $addFields: {
      teamName: "$_id"
    }
  },
  {
    $project: {
      _id: 0
    }
  }
]).toArray() as unknown as Promise<{
  teamName: string;
  matches: DbEntities.Match[];
}[]>;

export default {
  getSeasons,
  getMatchesOfSeason
};