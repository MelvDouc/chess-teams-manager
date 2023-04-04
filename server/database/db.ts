import { Client as MysqlClient } from "mysql";
import config from "/config/config.ts";
import { DbEntities } from "/types.ts";

const client = await new MysqlClient().connect({
  hostname: "eu-cdbr-west-03.cleardb.net",
  db: "heroku_f04d411794db32f",
  username: "b1c0b9139d2ca0",
  password: "24292de6"
});
console.log("%cConnected to database.", "color: yellow");

const db = {
  execute: (sql: string, values?: any) => client.execute(sql, values).then((value) => value.rows)
};

export default db;