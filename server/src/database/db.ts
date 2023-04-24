import { createConnection } from "mysql2/promise";
import queryBuilderFactory, { SqlRecord } from "./query-builder-factory.js";

if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config();
}

const client = await createConnection({
  user: process.env.CLEARDB_USER,
  password: process.env.CLEARDB_PASSWORD,
  database: process.env.CLEARDB_DATABASE,
  host: process.env.CLEARDB_HOST
});
console.log("%cConnected to database.", "color: yellow");

const createQueryBuilder = queryBuilderFactory(client);

const findOne = async <T>(tableName: string, filter: SqlRecord): Promise<T | null> => {
  const query = await createQueryBuilder()
    .select("*")
    .from(tableName)
    .where(filter)
    .limit(1)
    .run();
  return (query as unknown as T[])[0] ?? null;
};

const findAll = <T>(tableName: string) => {
  return createQueryBuilder()
    .select("*")
    .from(tableName)
    .run() as unknown as Promise<T>;
};

const insert = <T extends {}>(tableName: string, value: T, ...values: T[]) => {
  return createQueryBuilder()
    .insertInto(tableName)
    .values([value, ...values])
    .run() as unknown as Promise<{
      affectedRows: number;
      insertId: number;
    }>;
};

const update = <T>(tableName: string, filter: SqlRecord, updates: Partial<T>) => {
  return createQueryBuilder()
    .update(tableName)
    .set(updates as {})
    .where(filter)
    .run() as unknown as Promise<{
      affectedRows: number;
      insertId: number;
    }>;
};

const deleteOne = (tableName: string, filter: SqlRecord) => {
  return createQueryBuilder()
    .deleteFrom(tableName)
    .where(filter)
    .run() as unknown as Promise<{
      affectedRows: number;
      insertId: number;
    }>;
};

export default {
  createQueryBuilder,
  findOne,
  findAll,
  insert,
  update,
  delete: deleteOne
};