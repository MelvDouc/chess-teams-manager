import { collections } from "../database/db.js";
import { isNonEmptyString, isObject, isStringOrNull, isValidFfeId, isValidNumberOrNull } from "./validators.js";
import {
  DeleteResult,
  InsertOneResult,
  Player,
  PlayerRole,
  UpdateFilter,
  UpdateResult,
  WithId
} from "../types.js";

type PlayerFilter = Partial<Player>;

function getPlayer(filter: PlayerFilter): Promise<WithId<Player> | null> {
  return collections.players.findOne(filter);
}

function getPlayers(): Promise<WithId<Player>[]> {
  return collections.players.find().sort({ lastName: 1, firstName: 1 }).toArray();
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
    && typeof PlayerRole[data.role] === "string"
    && isNonEmptyString(data.firstName)
    && isNonEmptyString(data.lastName)
    && isNonEmptyString(data.email)
    && isStringOrNull(data.phone);
}

function isValidPlayerUpdate(data: Partial<Player>) {
  return isObject(data)
    && (!("fideId" in data) || isValidNumberOrNull(data.fideId))
    && (!("role" in data) || typeof PlayerRole[data.role!] === "string")
    && (!("firstName" in data) || isNonEmptyString(data.firstName))
    && (!("lastName" in data) || isNonEmptyString(data.lastName))
    && (!("email" in data) || isNonEmptyString(data.email))
    && (!("phone" in data) || isStringOrNull(data.phone));
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