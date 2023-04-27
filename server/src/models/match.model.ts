import { collections } from "../database/db.js";
import {
  DeleteResult,
  InsertOneResult,
  Match,
  UpdateFilter,
  UpdateResult,
  WithId
} from "../types.js";

type MatchFilter = Partial<WithId<Match>>;

function getMatch(filter: MatchFilter): Promise<WithId<Match> | null> {
  return collections.matches.findOne(filter);
}

function getMatches(): Promise<WithId<Match>[]> {
  return collections.matches.find().toArray();
}

function getSeasons(): Promise<number[]> {
  return collections.matches.distinct("season");
}

function createMatch(data: Match): Promise<InsertOneResult<Match>> {
  return collections.matches.insertOne(data);
}

function updateMatch(filter: MatchFilter, updates: UpdateFilter<Match>): Promise<UpdateResult<Match>> {
  return collections.matches.updateOne(filter, updates);
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