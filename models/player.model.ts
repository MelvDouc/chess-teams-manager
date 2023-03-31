import type { ObjectId } from "mongo";
import db from "/database/db.ts";
import formDataValidationMiddleware from "/middleware/form-validation.middleware.ts";
import { DbEntities, FormValidator } from "/types.ts";

const getPlayer = (filter: Partial<DbEntities.Player>) => db.players().findOne(filter);
const getPlayers = () => db.players().find().toArray();
const createPlayer = (player: DbEntities.Player) => db.players().insertOne(player) as Promise<ObjectId>;
const updatePlayer = (ffeId: string, updates: Partial<DbEntities.Player>) => db.players().updateOne({ ffeId }, {
  $set: updates
});
const deletePlayer = (ffeId: string) => db.players().deleteOne({ ffeId });

const extractData = (formData: URLSearchParams): { [K in keyof DbEntities.Player]: DbEntities.Player[K] | null } => {
  const fideId = formData.get("fideId");

  return {
    ffeId: formData.has("ffeId") ? formData.get("ffeId")!.trim() : null,
    fideId: (fideId === null) ? null : Number(fideId),
    firstName: formData.has("firstName") ? formData.get("firstName")!.trim() : null,
    lastName: formData.has("lastName") ? formData.get("lastName")!.trim() : null,
    email: formData.has("email") ? formData.get("email")!.trim() : null,
    phone: formData.has("phone") ? formData.get("phone")!.trim() : null,
    rating: formData.has("rating") ? parseInt(formData.get("rating")!) : 1199
  };
};

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  extractData,
};