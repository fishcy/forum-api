import { Filter, UpdateFilter } from "mongodb";
import { getDatabase } from "../../config/database";
import { Comment } from "../models/comment";
const database = getDatabase();
const tableName = "comment";
const commentCollection = database.collection<Comment>(tableName);

const createComment = async (doc: Comment) => {
  return await commentCollection.insertOne(doc);
};

const findComment = async (filter: Filter<Comment>) => {
  return await commentCollection.find(filter).toArray();
};

const updateComment = async (
  filter: Filter<Comment>,
  update: UpdateFilter<Comment>
) => {
  return await commentCollection.findOneAndUpdate(filter, update);
};

export default {
  createComment,
  findComment,
  updateComment,
};
