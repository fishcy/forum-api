import { PrivateMessage } from "../models/privateMessage";
import { getDatabase } from "../../config/database";
import {
  Filter,
  FindOptions,
  Document,
  UpdateFilter,
  Sort,
  CountDocumentsOptions,
} from "mongodb";

const database = getDatabase();
const tableName = "privateMessage";
const privateMessageCollection = database.collection<PrivateMessage>(tableName);

const createPrivateMessage = async (doc: PrivateMessage) => {
  return await privateMessageCollection.insertOne(doc);
};

const findPrivateMessage = async (
  filter: Filter<PrivateMessage>,
  option?: FindOptions<Document>,
  sort?: Sort,
  skipNum: number = 0,
  limitNum: number = 0
) => {
  return await privateMessageCollection
    .find(filter, option)
    .sort(sort)
    .skip(skipNum)
    .limit(limitNum)
    .toArray();
};

const updatePrivateMessage = async (
  filter: Filter<PrivateMessage>,
  update: UpdateFilter<PrivateMessage>
) => {
  return await privateMessageCollection.findOneAndUpdate(filter, update);
};

const countPrivateMessage = async (
  filter: Filter<PrivateMessage>,
  option?: CountDocumentsOptions
) => {
  return await privateMessageCollection.countDocuments(filter, option);
};

export default {
  createPrivateMessage,
  findPrivateMessage,
  updatePrivateMessage,
  countPrivateMessage
};
