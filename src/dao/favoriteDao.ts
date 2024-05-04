import { getDatabase } from "../../config/database";
import { Favorite } from "../models/favorite";
import { Filter, FindOptions, UpdateFilter, Document } from "mongodb";

const database = getDatabase();
const tableName = "favorite";
const favoriteCollection = database.collection<Favorite>(tableName);

const createFavorite = async (doc: Favorite) => {
  return await favoriteCollection.insertOne(doc);
};

const findFavorite = async (
  filter: Filter<Favorite>,
  option?: FindOptions<Document>
) => {
  return await favoriteCollection.find(filter, option).toArray();
};

const updateFavorite = async (
  filter: Filter<Favorite>,
  update: UpdateFilter<Favorite>
) => {
  return await favoriteCollection.findOneAndUpdate(filter, update);
};

export default {
  createFavorite,
  findFavorite,
  updateFavorite,
};
