import { collections } from "../database/db.js";
import { DeleteResult, InsertOneResult, Match, UpdateFilter, UpdateResult, WithId } from "../types.js";
import { isNonEmptyString, isObject, isValidFfeId, isValidISODateString, isValidNumber } from "./validators.js";

const matchesPipeline = [
  {
    $sort: {
      date: 1,
    },
  },
  {
    $group: {
      _id: "$teamName",
      matches: {
        $push: "$$ROOT",
      },
    },
  },
  {
    $project: {
      teamName: "$_id",
      matches: 1,
      _id: 0,
    },
  },
  {
    $sort: {
      teamName: 1,
    },
  },
];

function getMatch(filter: MatchFilter): Promise<WithId<Match> | null> {
  return collections.matches.findOne(filter);
}

function getMatches(season: number): Promise<MatchesByTeamName[]> {
  return collections.matches
    .aggregate([
      {
        $match: { season },
      },
      ...matchesPipeline,
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

function isValidNewMatch(data: Match) {
  return (
    isObject(data) &&
    isValidNumber(data.season) &&
    isValidNumber(data.round) &&
    isNonEmptyString(data.teamName) &&
    typeof data.whiteOnOdds === "boolean" &&
    isNonEmptyString(data.opponent) &&
    isNonEmptyString(data.address) &&
    isNonEmptyString(data.city) &&
    isNonEmptyString(data.zipCode) &&
    (data.captainFfeId === null || isValidFfeId(data.captainFfeId)) &&
    isValidISODateString(data.date) &&
    isValidLineUp(data.lineUp)
  );
}

function isValidMatchUpdate(data: Partial<Match>) {
  console.log(data);
  return (
    isObject(data) &&
    (data.season == null || isValidNumber(data.season)) &&
    (data.round == null || isValidNumber(data.round)) &&
    (data.teamName == null || isNonEmptyString(data.teamName)) &&
    (data.whiteOnOdds == null || typeof data.whiteOnOdds === "boolean") &&
    (data.opponent == null || isNonEmptyString(data.opponent)) &&
    (data.address == null || isNonEmptyString(data.address)) &&
    (data.city == null || isNonEmptyString(data.city)) &&
    (data.zipCode == null || isNonEmptyString(data.zipCode)) &&
    (data.captainFfeId == null || isValidFfeId(data.captainFfeId)) &&
    (data.date == null || isValidISODateString(data.date)) &&
    (data.lineUp == null || isValidLineUp(data.lineUp))
  );
}

function isValidLineUp(lineUp: Match["lineUp"]) {
  return (
    isObject(lineUp) &&
    Object.entries(lineUp).every(([board, item]) => {
      return (
        +board > 0 && +board <= 8 && (item === null || (isValidFfeId(item.ffeId) && typeof item.name === "string" && isValidNumber(item.rating)))
      );
    })
  );
}

export default {
  getMatch,
  getMatches,
  getSeasons,
  createMatch,
  updateMatch,
  deleteMatch,
  isValidNewMatch,
  isValidMatchUpdate,
};

type MatchFilter = Partial<WithId<Match>>;
type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: WithId<Match>[];
};
