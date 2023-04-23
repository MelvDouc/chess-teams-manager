import { Client as MysqlClient } from "mysql";
import config from "/config/config.ts";
import queryBuilderFactory, { SqlRecord } from "/database/query-builder-factory.ts";

const client = new MysqlClient();
await client.connect({
  username: config.CLEARDB_USER,
  password: config.CLEARDB_PASSWORD,
  db: config.CLEARDB_DATABASE,
  hostname: config.CLEARDB_HOST
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
  return query[0] ?? null;
};

const findAll = (tableName: string) => {
  return createQueryBuilder()
    .select("*")
    .from(tableName)
    .run();
};

const insert = <T extends {}>(tableName: string, value: T, ...values: T[]) => {
  return createQueryBuilder()
    .insertInto(tableName)
    .values([value, ...values])
    .run();
};

const update = <T>(tableName: string, filter: SqlRecord, updates: Partial<T>) => {
  return createQueryBuilder()
    .update(tableName)
    .set(updates as {})
    .where(filter)
    .run();
};

const deleteOne = (tableName: string, filter: SqlRecord) => {
  return createQueryBuilder()
    .deleteFrom(tableName)
    .where(filter)
    .run();
};

export default {
  createQueryBuilder,
  findOne,
  findAll,
  insert,
  update,
  delete: deleteOne
};