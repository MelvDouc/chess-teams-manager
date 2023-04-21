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

export default {
  query,
  execute
};