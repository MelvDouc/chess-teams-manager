import { createPool } from "mysql2/promise";
import queryBuilderFactory, { SqlRecord } from "./query-builder-factory.js";
import config from "../config/config.js";

const client = createPool({
  user: config.CLEARDB_USER,
  password: config.CLEARDB_PASSWORD,
  database: config.CLEARDB_DATABASE,
  host: config.CLEARDB_HOST
});
console.log("\n\x1b[33mConnected to database.\x1b[0m");

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

const findAll = <T>(tableName: string, filter?: SqlRecord) => {
  if (filter)
    return createQueryBuilder()
      .select("*")
      .from(tableName)
      .where(filter)
      .run() as unknown as Promise<T[]>;

  return createQueryBuilder()
    .select("*")
    .from(tableName)
    .run() as unknown as Promise<T[]>;
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
    }>;
};

const deleteOne = (tableName: string, filter: SqlRecord) => {
  return createQueryBuilder()
    .deleteFrom(tableName)
    .where(filter)
    .run() as unknown as Promise<{
      affectedRows: number;
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