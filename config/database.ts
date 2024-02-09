import { Db, MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "fishcy_blog";
const client = new MongoClient(url, { monitorCommands: true });

let database: Db;
export async function connect() {
  try {
    await client.connect();
    database = client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

// connect();

export const getDatabase = () => {
  return database;
};
