import { ObjectId } from "mongodb";
import collectionDao from "../dao/collectionDao";
import { Collection } from "../models/collection";
import { findFavoriteByOwnerId } from "./favoriteServices";

export const createCollection = async (
  articleId: string,
  favoriteId: string
) => {
  return await collectionDao.createCollection(
    new Collection(articleId, favoriteId)
  );
};

export const findCollectionById = async (_id: ObjectId) => {
  return await collectionDao.findCollection({
    _id,
  });
};

export const findCollectionByArticleId = async (articleId: string) => {
  return await collectionDao.findCollection({
    articleId,
  });
};

export const findCollectionByFavoriteId = async (favoriteId: string) => {
  return await collectionDao.findCollection({
    favoriteId,
  });
};

export const collect = async (articleId: string, favoriteId: string) => {
  return await collectionDao.updateCollection(
    {
      articleId,
      favoriteId,
    },
    {
      $set: {
        isCancel: 0,
      },
    }
  );
};

export const cancelCollection = async (
  articleId: string,
  favoriteId: string
) => {
  return await collectionDao.updateCollection(
    {
      articleId,
      favoriteId,
    },
    {
      $set: {
        isCancel: 1,
      },
    }
  );
};

export const isCollected = async (articleId: string, userId: string) => {
  const collections = (await findCollectionByArticleId(articleId)).filter(
    (item) => {
      return !item.isCancel;
    }
  );
  const favoriteIds = (await findFavoriteByOwnerId(userId)).map((item) =>
    item._id.toString()
  );
  for (const collection of collections) {
    if (favoriteIds.includes(collection.favoriteId)) return 1;
  }
  return 0;
};

export const countArticlesOfFavorite = async (favoriteId: string) => {
  return await collectionDao.countCollection({
    favoriteId,
    isCancel: 0,
  });
};
