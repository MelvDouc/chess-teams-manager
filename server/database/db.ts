import config from "/config/config.ts";
import { Client as MysqlClient } from "mysql";

const client = new MysqlClient();
await client.connect({
  username: config.CLEARDB_USER,
  password: config.CLEARDB_PASSWORD,
  db: config.CLEARDB_DATABASE,
  hostname: config.CLEARDB_HOST
});
console.log("%cConnected to database.", "color: yellow");


const query = client.query.bind(client);

const findOne = async <T>(tableName: string, filter: Partial<T>) => {
  const whereClause = Object.keys(filter).map((key) => `${key} = ?`).join(" AND ");
  const search = await client.query(
    `SELECT * FROM ${tableName} WHERE ${whereClause} LIMIT 1`,
    Object.values(filter)
  );
  return search[0] ?? null;
};

const findAll = (tableName: string) => {
  return client.query(`SELECT * FROM ${tableName}`);
};

const insert = <T extends {}>(tableName: string, value: T, ...values: T[]) => {
  const keys = Object.keys(value);
  const questionMarks = Array(keys.length).fill("?").join();
  const placeholders = Array.from({ length: values.length + 1 }, () => {
    return `(${questionMarks})`;
  }).join();

  return client.execute(
    `INSERT INTO ${tableName} (${keys.join()}) VALUES ${placeholders}`,
    [...Object.values(value), ...values.flatMap((v) => Object.values(v))]
  );
};

const update = <T>(tableName: string, filter: Partial<T>, updates: Partial<T>) => {
  const placeholders = Object.keys(updates).map((key) => `${key} = ?`).join();
  const whereClause = Object.keys(filter).map((key) => `${key} = ?`).join(" AND ");

  return client.execute(
    `UPDATE ${tableName} SET ${placeholders} WHERE ${whereClause}`,
    [...Object.values(updates), ...Object.values(filter)]
  );
};

const deleteOne = <T>(tableName: string, filter: Partial<T>) => {
  const whereClause = Object.keys(filter).map((key) => `${key} = ?`).join(" AND ");

  return client.execute(
    `DELETE FROM ${tableName} WHERE ${whereClause}`,
    Object.values(filter)
  );
};

export default {
  query,
  findOne,
  findAll,
  insert,
  update,
  delete: deleteOne
};