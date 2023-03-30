import { MongoClient } from "mongo";
import { DbEntities } from "/types.ts";

const client = new MongoClient();

const mainDb = await client.connect(Deno.env.get("MONGODB_URI")!);
console.log("%cConnected to database.", "color: yellow");

export default {
  players: () => mainDb.collection<DbEntities.Player>("players"),
  matches: () => mainDb.collection<DbEntities.Match>("matches"),
  users: () => mainDb.collection<DbEntities.User>("users"),
};