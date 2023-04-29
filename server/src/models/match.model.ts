import { collections } from "../database/db.js";
import {
  DeleteResult,
  InsertOneResult,
  Match,
  UpdateFilter,
  UpdateResult,
  WithId
} from "../types.js";

const matchesPipeline = [
  {
    $sort: {
      date: 1
    }
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
    $project: {
      teamName: "$_id",
      matches: 1,
      _id: 0
    }
  },
  {
    $sort: {
      teamName: 1
    }
  }
];

function getMatch(filter: MatchFilter): Promise<WithId<Match> | null> {
  return collections.matches.findOne(filter);
}

function getMatches(season: number): Promise<MatchesByTeamName[]> {
  return collections
    .matches
    .aggregate([
      {
        $match: { season }
      },
      ...matchesPipeline
    ])
    .toArray() as Promise<MatchesByTeamName[]>;
}

function getSeasons(): Promise<number[]> {
  return collections.matches.distinct("season");
}

function createMatch(data: Match): Promise<InsertOneResult<Match>> {
  return collections.matches.insertOne(data);
}

function updateMatch(filter: MatchFilter, updates: UpdateFilter<Match>): Promise<UpdateResult<Match>> {
  return collections.matches.updateOne(filter, updates as any);
}

function deleteMatch(filter: MatchFilter): Promise<DeleteResult> {
  return collections.matches.deleteOne(filter);
}

export default {
  getMatch,
  getMatches,
  getSeasons,
  createMatch,
  updateMatch,
  deleteMatch
};

type MatchFilter = Partial<WithId<Match>>;
type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: WithId<Match>[];
};