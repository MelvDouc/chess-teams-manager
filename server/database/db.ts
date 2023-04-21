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
const execute = client.execute.bind(client);

const insert = (tableName: string, value: Record<string, string | number | boolean | null>, ...values: (typeof value)[]) => {
  const keys = Object.keys(value);
  const questionMarks = Array(keys.length).fill("?").join();
  const placeholders = Array.from({ length: values.length + 1 }, () => {
    return `(${questionMarks})`;
  }).join();

  return execute(
    `INSERT INTO ${tableName} (${keys.join()}) VALUES ${placeholders}`,
    [value, ...values]
  );
};

export default {
  query,
  execute,
  insert
};