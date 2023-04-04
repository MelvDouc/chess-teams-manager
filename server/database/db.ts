import { MongoClient } from "mongo";
import config from "/config/config.ts";
import { DbEntities } from "/types.ts";

const client = new MongoClient();
const mainDb = await client.connect(config.MONGODB_URI);
console.log("%cConnected to database.", "color: yellow");

const collections = {
  players: () => mainDb.collection<DbEntities.Player>("players"),
  matches: () => mainDb.collection<DbEntities.Match>("matches"),
  users: () => mainDb.collection<DbEntities.User>("users")
};


export default collections;