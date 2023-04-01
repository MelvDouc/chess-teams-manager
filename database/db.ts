import { MongoClient } from "mongo";
import config from "/config/config.ts";
import { DbEntities } from "/types.ts";

function falseCollection<T>() {
  const coll = ({
    find: (filter?: Partial<T>) => ({
      toArray: () => Promise.resolve([] as T[])
    }),
    findOne: (filter: Partial<T>) => Promise.resolve(null as T | null),
    insertOne: (doc: T) => Promise.resolve(null),
    updateOne: (filter: Partial<T>, updates: { $set: Partial<T>; }) => Promise.resolve({
      upsertedId: undefined,
      upsertedCount: 0,
      matchedCount: 0,
      modifiedCount: 0
    }),
    deleteOne: (filter: Partial<T>) => Promise.resolve(-1)
  });
  return () => coll;
}

async function getCollections() {
  try {
    const client = new MongoClient();
    const mainDb = await client.connect(config.MONGODB_URI);
    console.log("%cConnected to database.", "color: yellow");
    return {
      players: () => mainDb.collection<DbEntities.Player>("players"),
      matches: () => mainDb.collection<DbEntities.Match>("matches"),
      users: () => mainDb.collection<DbEntities.User>("users")
    };
  } catch (error) {
    console.log(`%cError connecting to db: %c${error.message ?? error}`, "color: red", "color: orange");
    return {
      players: falseCollection<DbEntities.Player>(),
      matches: falseCollection<DbEntities.Match>(),
      users: falseCollection<DbEntities.User>(),
    };
  }
}

const collections = await getCollections();
export default collections;