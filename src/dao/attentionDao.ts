import {
  CountDocumentsOptions,
  Filter,
  FindOptions,
  UpdateFilter,
} from "mongodb";
import { getDatabase } from "../../config/database";
import { Attention } from "../models/attention";

const database = getDatabase();
const tableName = "attention";
const attentionCollection = database.collection<Attention>(tableName);

const createAttention = async (doc: Attention) => {
  return await attentionCollection.insertOne(doc);
};

const findAttention = async (
  filter: Filter<Attention>,
  option?: FindOptions<Attention>
) => {
  return await attentionCollection.find(filter, option).toArray();
};

const updateAttention = async (
  filter: Filter<Attention>,
  update: UpdateFilter<Attention>
) => {
  return await attentionCollection.findOneAndUpdate(filter, update);
};

const countAttentionRecord = async (
  filter: Filter<Attention>,
  option?: CountDocumentsOptions
) => {
  return await attentionCollection.countDocuments(filter, option);
};

export default {
  createAttention,
  findAttention,
  updateAttention,
  countAttentionRecord,
};
