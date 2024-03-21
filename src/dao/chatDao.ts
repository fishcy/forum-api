import { Chat } from "../models/chat";
import { getDatabase } from "../../config/database";
import { Filter, FindOptions, Document, UpdateFilter } from "mongodb";

const database = getDatabase();
const tableName = "chat";
const chatCollection = database.collection<Chat>(tableName);

const createChat = async (doc: Chat) => {
  return await chatCollection.insertOne(doc);
};

const findChat = async (
  filter: Filter<Chat>,
  option?: FindOptions<Document>
) => {
  return await chatCollection.find(filter, option).toArray();
};

const updateChat = async (filter: Filter<Chat>, update: UpdateFilter<Chat>) => {
  return await chatCollection.findOneAndUpdate(filter, update);
};

export default {
  createChat,
  findChat,
  updateChat,
};
