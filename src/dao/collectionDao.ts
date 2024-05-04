import {
  Filter,
  FindOptions,
  Document,
  UpdateFilter,
  CountDocumentsOptions,
} from "mongodb";
import { getDatabase } from "../../config/database";
import { Collection } from "../models/collection";

const database = getDatabase();
const tableName = "collection";
const collectionCollection = database.collection<Collection>(tableName);

const createCollection = async (doc: Collection) => {
  return await collectionCollection.insertOne(doc);
};

const findCollection = async (
  filter: Filter<Collection>,
  option?: FindOptions<Document>
) => {
  return await collectionCollection.find(filter, option).toArray();
};

const updateCollection = async (
  filter: Filter<Collection>,
  update: UpdateFilter<Collection>
) => {
  return await collectionCollection.findOneAndUpdate(filter, update);
};

const countCollection = async (
  filter: Filter<Collection>,
  option?: CountDocumentsOptions
) => {
  return await collectionCollection.countDocuments(filter, option);
};

export default {
  createCollection,
  findCollection,
  updateCollection,
  countCollection,
};
