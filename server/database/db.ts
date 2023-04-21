import config from "/config/config.ts";
import { Client as MysqlClient } from "mysql";

const clientConfig = config.CLEARDB_DATABASE_URL.match(
  /mysql:\/\/(?<username>\w+):(?<password>\w+)@(?<hostname>[^\/]+)\/(?<db>.+)\?reconnect=true/
)?.groups!;

const client = new MysqlClient();
await client.connect({
  username: clientConfig.username,
  password: clientConfig.password,
  db: clientConfig.db,
  hostname: clientConfig.hostname
});
console.log("%cConnected to database.", "color: yellow");

const query = client.query.bind(client);
const execute = client.execute.bind(client);

export default {
  query,
  execute
};