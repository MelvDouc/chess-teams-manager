import type { ObjectId } from "mongo";
import db from "/database/db.ts";
import formDataValidationMiddleware from "/middleware/form-validation.middleware.ts";
import { DbEntities, FormValidator } from "/types.ts";

const getPlayer = (ffeId: string) => db.players().findOne({ ffeId });
const getPlayers = () => db.players().find().toArray();

const uniqueFfeId: FormValidator<DbEntities.Player> = {
  key: "ffeId",
  validate: async (ffeId: unknown) => !(await db.players().findOne({ ffeId: ffeId as string })),
  error: "Il existe déjà un joueur avec ce n° FFE."
};

const uniqueFideId: FormValidator<DbEntities.Player> = {
  key: "fideId" as keyof DbEntities.Player,
  validate: async (fideId: unknown) => Number(fideId) === 0 || !(await db.players().findOne({ fideId: Number(fideId) })),
  error: "Il existe déjà un joueur avec ce n° FIDE."
};

const updateValidators: FormValidator<DbEntities.Player>[] = [
  {
    key: "ffeId",
    validate: (ffeId) => typeof ffeId === "string" && /^[A-Z]\d+$/.test(ffeId),
    error: "N° FFE invalide."
  },
  {
    key: "firstName",
    validate: (firstName) => typeof firstName === "string" && firstName !== "",
    error: "Prénom requis."
  },
  {
    key: "lastName",
    validate: (lastName) => typeof lastName === "string" && lastName !== "",
    error: "Nom de famille requis."
  },
  {
    key: "email",
    validate: (email) => typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()),
    error: "Email invalide."
  },
  {
    key: "rating",
    validate: (rating) => rating === undefined || Number(rating) >= 0,
    error: "Le classement Elo doit être un nombre supérieur à 0."
  },
  {
    key: "phone",
    validate: () => true,
    error: ""
  }
];

const createValidators = updateValidators.toSpliced(1, 0, uniqueFfeId, uniqueFideId);
const updateValidationMiddleware = formDataValidationMiddleware<DbEntities.Player>(updateValidators);
const createValidationMiddleware = formDataValidationMiddleware<DbEntities.Player>(createValidators);

const createPlayer = (player: DbEntities.Player) => db.players().insertOne(player) as Promise<ObjectId>;
const updatePlayer = (ffeId: string, updates: Partial<DbEntities.Player>) => db.players().updateOne({ ffeId }, {
  $set: updates
});
const deletePlayer = (ffeId: string) => db.players().deleteOne({ ffeId });

export default {
  getPlayer,
  getPlayers,
  createValidationMiddleware,
  createPlayer,
  updateValidationMiddleware,
  updatePlayer,
  deletePlayer
};