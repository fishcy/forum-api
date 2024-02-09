import { ObjectId } from "mongodb";
import articleDao from "../dao/articleDao";

import { Article } from "../models/article";

export const createArticle = async (
  title: string,
  content: string,
  authorId: ObjectId
) => {
  return await articleDao.createArticle(new Article(title, content, authorId));
};

export const findArticles = async (searchContent: string) => {
  return await articleDao.findArticles(
    {
      isDelete: 0,
      $or: [
        { title: { $regex: `${searchContent}` } },
        { content: { $regex: `${searchContent}` } },
      ],
    }
  );
};
