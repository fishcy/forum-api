import { Filter, UpdateFilter } from "mongodb";
import { getDatabase } from "../../config/database";
import { ThumbsUp } from "../models/thumbsUp";
const database = getDatabase();
const tableName = "thumbsUp";
const thumbsUpCollection = database.collection<ThumbsUp>(tableName);

const createThumbsUp = async (doc: ThumbsUp) => {
  return await thumbsUpCollection.insertOne(doc);
};

const findThumbsUp = async (filter: Filter<ThumbsUp>) => {
  let result = await thumbsUpCollection.find(filter).toArray();
  return result;
};

const updateThumbsUp = async (
  filter: Filter<ThumbsUp>,
  update: UpdateFilter<ThumbsUp>
) => {
  return await thumbsUpCollection.findOneAndUpdate(filter, update);
};

export default {
  createThumbsUp,
  findThumbsUp,
  updateThumbsUp,
};
