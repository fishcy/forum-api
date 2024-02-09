import { Filter, FindOptions, ObjectId, UpdateFilter, Document } from "mongodb";
import { getDatabase } from "../../config/database";
import { Article } from "../models/article";

const database = getDatabase();
const tableName = "article";
const articleCollection = database.collection<Article>(tableName);

const createArticle = async (doc: Article) => {
  return await articleCollection.insertOne(doc);
};

const findArticles = async (
  filter: Filter<Article>,
  option?: FindOptions<Document>
) => {
  let result = await articleCollection
    .find(filter, option)
    .project<Article>({ isDelete: false })
    .toArray();
  return result;
};

const updateArticle = async (_id: ObjectId, update: UpdateFilter<Article>) => {
  return await articleCollection.findOneAndUpdate(
    {
      _id,
    },
    update
  );
};

export default {
  createArticle,
  findArticles,
  updateArticle,
};
