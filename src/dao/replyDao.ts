import { Filter, UpdateFilter } from "mongodb";
import { getDatabase } from "../../config/database";
import { Reply } from "../models/reply";
const database = getDatabase();
const tableName = "reply";
const replyCollection = database.collection<Reply>(tableName);

const createReply = async (doc: Reply) => {
  return await replyCollection.insertOne(doc);
};

const findReply = async (filter: Filter<Reply>) => {
  return await replyCollection.find(filter).toArray();
};

const updateReply = async (
  filter: Filter<Reply>,
  update: UpdateFilter<Reply>
) => {
  return await replyCollection.findOneAndUpdate(filter, update);
};

export default {
  createReply,
  findReply,
  updateReply,
};
