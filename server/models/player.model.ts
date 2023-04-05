import type { ObjectId } from "mongo";
import db from "/database/db.ts";
import { isNonEmptyString, isValidEmail, isValidFfeId, isValidNumber } from "/models/validators.ts";
import { DbEntities, Nullable } from "/types.ts";

const getPlayer = (filter: Partial<DbEntities.Player>) => db.players.findOne(filter);

const getPlayers = () => db.players.find().toArray();

const createPlayer = (player: DbEntities.Player) => db.players.insertOne(player) as Promise<ObjectId>;

const updatePlayer = (ffeId: string, updates: Partial<DbEntities.Player>) => db.players.updateOne({ ffeId }, {
  $set: updates
});

const deletePlayer = (ffeId: string) => db.players.deleteOne({ ffeId });

// ===== ===== ===== ===== =====
// ERRORS
// ===== ===== ===== ===== =====

function ensurePlayer(data: DbEntities.Player): DbEntities.Player {
  return {
    ffeId: (data.ffeId) ? String(data.ffeId) : "",
    fideId: (data.fideId) ? parseInt(data.fideId as unknown as string) : null,
    email: (data.email) ? String(data.email) : "",
    firstName: (data.firstName) ? String(data.firstName) : "",
    lastName: (data.lastName) ? String(data.lastName) : "",
    rating: (data.rating) ? parseInt(data.rating as unknown as string) : null
  };
}

async function* ffeIdErrors(ffeId: string): AsyncGenerator<string> {
  if (!isNonEmptyString(ffeId) || !isValidFfeId(ffeId)) {
    yield "N° FFE invalide.";
    return;
  }

  if (await getPlayer({ ffeId }))
    yield "Il existe déjà un joueur avec ce n° FFE.";
}

async function* fideIdErrors(fideId: number | null): AsyncGenerator<string> {
  if (fideId === null)
    return;

  if (isNaN(fideId)) {
    yield "N° FIDE invalide.";
    return;
  }

  if (await getPlayer({ fideId }))
    yield "Il existe déjà un joueur avec ce n° FIDE.";
}

function* variousErrors(player: DbEntities.Player): Generator<string> {
  if (!isNonEmptyString(player.firstName))
    yield "Prénom requis.";

  if (!isNonEmptyString(player.lastName))
    yield "Nom de famille requis.";

  if (!isNonEmptyString(player.email) || !isValidEmail(player.email))
    yield "Email invalide.";
}

async function getCreateErrors(player: DbEntities.Player) {
  const errors: string[] = [];

  for await (const err of ffeIdErrors(player.ffeId))
    errors.push(err);

  for await (const err of fideIdErrors(player.fideId))
    errors.push(err);

  return errors.concat(...variousErrors(player));
}

async function getUpdateErrors(updates: DbEntities.Player, playerInDb: DbEntities.Player) {
  const errors: string[] = [];

  if (updates.ffeId !== playerInDb.ffeId) {
    for await (const err of ffeIdErrors(updates.ffeId))
      errors.push(err);
  }

  if (updates.fideId !== playerInDb.fideId) {
    for await (const err of fideIdErrors(updates.fideId))
      errors.push(err);
  }

  return errors.concat(...variousErrors(updates));
}

// ===== ===== ===== ===== =====
// EXPORT
// ===== ===== ===== ===== =====

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  ensurePlayer,
  getCreateErrors,
  getUpdateErrors
};