import { ObjectId } from "mongodb";
import favoriteDao from "../dao/favoriteDao";
import { Favorite } from "../models/favorite";

export const createFavorite = async (ownerId: string, favoriteName: string) => {
  return await favoriteDao.createFavorite(new Favorite(ownerId, favoriteName));
};

export const findFavoriteById = async (favoriteId: string) => {
  return await favoriteDao.findFavorite({
    _id: new ObjectId(favoriteId),
  });
};

export const findFavoriteByOwnerId = async (ownerId: string) => {
  return await favoriteDao.findFavorite({
    ownerId,
    isDelete: 0,
  });
};

export const updateFavoriteNameById = async (
  _id: ObjectId,
  favoriteName: string
) => {
  return await favoriteDao.updateFavorite(
    {
      _id,
    },
    {
      $set: {
        favoriteName,
      },
    }
  );
};

export const deleteFavoriteById = async (_id: ObjectId) => {
  return await favoriteDao.updateFavorite(
    {
      _id,
    },
    {
      $set: {
        isDelete: 1,
      },
    }
  );
};
