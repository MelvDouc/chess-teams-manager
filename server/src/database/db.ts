import { MongoClient } from "mongodb";
import config from "../config/config.js";
import { Match, Player } from "../types.js";

const client = await new MongoClient(config.MONGODB_URI).connect();
console.log("\n\x1b[33mConnected to database.\x1b[0m");

const mainDb = client.db("main");
export const collections = {
  players: mainDb.collection<Player>("players"),
  matches: mainDb.collection<Match>("matches")
} as const;