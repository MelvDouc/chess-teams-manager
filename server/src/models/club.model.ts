import { z } from "zod";
import db from "../database/db.js";
import { DbEntities, WithoutId } from "../types.js";

const createClubSchema = z.object({
  name: z.string().min(1).max(20),
  address: z.string().min(1),
  email: z.string().email({ message: "Adresse email invalide." }).max(50).nullable(),
  phone: z.string().max(15).nullable(),
});

const updateClubSchema = z.object({
  name: z.string().min(1).max(20).optional(),
  address: z.string().min(1).optional(),
  email: z.string().email({ message: "Adresse email invalide." }).max(50).nullable().optional(),
  phone: z.string().max(15).nullable().optional(),
});

const getClub = (id: number) => db.findOne("club", { id });

const getClubs = () => db.findAll("club");

const createClub = (data: DbEntities.Club) => {
  return db.insert("club", createClubSchema.parse(data));
};

const updateClub = (id: number, updates: Partial<WithoutId<DbEntities.Club>>) => {
  return db.update("club", { id }, updateClubSchema.parse(updates));
};

const deleteClub = (id: number) => {
  return db.delete("club", { id });
};

export default {
  getClub,
  getClubs,
  createClub,
  updateClub,
  deleteClub
};