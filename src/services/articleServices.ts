import { ObjectId } from "mongodb";
import articleDao from "../dao/articleDao";

import { Article } from "../models/article";

export const createArticle = async (
  title: string,
  textContent: string,
  htmlContent: string,
  authorId: ObjectId,
  coverImage: string
) => {
  return await articleDao.createArticle(
    new Article(title, textContent, htmlContent, authorId, coverImage)
  );
};

export const searchArticles = async (searchContent: string) => {
  return await articleDao.findArticles({
    isDelete: 0,
    $or: [
      { title: { $regex: `${searchContent}` } },
      { content: { $regex: `${searchContent}` } },
    ],
  });
};

export const findArticlesById = async (_id: ObjectId) => {
  return await articleDao.findArticles({
    isDelete: 0,
    _id,
  });
};

export const findArticlesByAuthorId = async (authorId: ObjectId) => {
  return await articleDao.findArticles({
    isDelete: 0,
    authorId,
  });
};

export const deleteArticleByArticleId = async (articleId: ObjectId) => {
  return await articleDao.updateArticle(articleId, {
    $set: {
      isDelete: 1,
    },
  });
};

export const viewNumPlusOne = async (articleId: ObjectId, viewNum: number) => {
  return await articleDao.updateArticle(articleId, {
    $set: {
      viewNum,
    },
  });
};
