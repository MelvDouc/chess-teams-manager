import { collections } from "../database/db.js";
import {
  isNonEmptyString,
  isObject,
  isStringOrNull,
  isValidFfeId,
  isValidNumber,
  isValidNumberOrNull
} from "./validators.js";
import {
  DeleteResult,
  InsertOneResult,
  Player,
  UpdateFilter,
  UpdateResult,
  WithId
} from "../types.js";

type PlayerFilter = Partial<Player>;

function getPlayer(filter: PlayerFilter): Promise<WithId<Player> | null> {
  return collections.players.findOne(filter);
}

function getPlayers(): Promise<WithId<Player>[]> {
  return collections.players.find().toArray();
}

function createPlayer(data: Omit<Player, "pwdResetId">): Promise<InsertOneResult<Player>> {
  return collections.players.insertOne(data);
}

function updatePlayer(filter: PlayerFilter, updates: UpdateFilter<Omit<Player, "ffeId">>): Promise<UpdateResult<Player>> {
  return collections.players.updateOne(filter, updates as any);
}

function deletePlayer(filter: PlayerFilter): Promise<DeleteResult> {
  return collections.players.deleteOne(filter);
}

function isValidNewPlayer(data: Player) {
  return isObject(data)
    && isValidFfeId(data.ffeId)
    && isValidNumberOrNull(data.fideId)
    && isNonEmptyString(data.firstName)
    && isNonEmptyString(data.lastName)
    && isNonEmptyString(data.email)
    && isStringOrNull(data.phone);
}

function isValidPlayerUpdate(data: Partial<Player>) {
  return isObject(data)
    && (data.fideId == null || isValidNumber(data.fideId))
    && (data.firstName == null || isNonEmptyString(data.firstName))
    && (data.lastName == null || isNonEmptyString(data.lastName))
    && (data.email == null || isNonEmptyString(data.email))
    && (data.phone == null || isStringOrNull(data.phone));
}

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  isValidNewPlayer,
  isValidPlayerUpdate
};