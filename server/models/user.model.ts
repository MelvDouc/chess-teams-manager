import db from "/database/db.ts";
import { DbEntities, WithoutId } from "/types.ts";

type User = DbEntities.User;

function getUser(filter: Partial<Omit<User, "password">>): Promise<User | null> {
  return db.findOne("user", filter);
}

function getUsers(): Promise<User[]> {
  return db.findAll("user");
}

function createUser({ email, password, role }: Omit<User, "password_reset_id">) {
  return db.insert("user", { email, password, role });
}

function updateUser(email: User["email"], updates: WithoutId<User, "email">) {
  return db.update<DbEntities.User>("user", { email }, updates);
}

function deleteUser(email: User["email"]) {
  return db.delete("user", { email });
}

export default {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};