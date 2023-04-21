import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

type User = DbEntities.User;

async function getUser(data: Partial<Omit<User, "password">>): Promise<User | null> {
  const placeholders = Object.keys(data).map((key) => `${key}=?`).join(" AND ");
  const search = await db.query(`SELECT * FROM user WHERE ${placeholders}`, Object.values(data));
  return search[0] ?? null;
}

function getUsers(): Promise<User[]> {
  return db.query("SELECT * FROM user WHERE id = ?");
}

function createUser({ email, password, role }: Omit<User, "password_reset_id">) {
  return db.execute(
    "INSERT INTO user (email, password, role) VALUES (?, ?, ?)",
    [email, password, role]
  );
}

function updateUser(email: User["email"], updates: Partial<Omit<User, "email">>) {
  const placeholders = Object.keys(updates).map((key) => `${key}=?`).join();
  return db.execute(
    `UPDATE user SET ${placeholders} WHERE email = ?`, [...Object.values(updates), email]
  );
}

function deleteUser(email: User["email"]) {
  return db.execute("DELETE FROM club WHERE email = ?", [email]);
}

export default {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};