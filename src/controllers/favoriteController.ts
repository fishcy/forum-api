import { IMiddleware } from "koa-router";
import {
  createFavorite as create,
  updateFavoriteNameById,
  deleteFavoriteById,
  findFavoriteById,
  findFavoriteByOwnerId,
} from "../services/favoriteServices";
import { ResponseBody } from "../middleware/responseBody";
import { ObjectId } from "mongodb";
import { formatFavoriteEntry } from "../utils/favorite";
import { findCollectionByFavoriteId } from "../services/collectionServices";

export const getFavorite: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { ownerId } = ctx.request.query as Record<string, any>;
  const favorites = await findFavoriteByOwnerId(ownerId);
  const result = [];
  for (const favorite of favorites) {
    result.push(await formatFavoriteEntry(favorite));
  }
  responseBody.data = result;
  await next();
};

export const getFavoriteDetails: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { favoriteId } = ctx.request.query as Record<string, any>;
  const favorites = await findFavoriteById(favoriteId);
  if (!favorites.length) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  responseBody.data = await formatFavoriteEntry(favorites[0]);
  await next();
};

export const checkUserCollectArticle: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { articleId } = ctx.request.query as Record<string, any>;
  const userId = ctx.state.payload._id;
  const favorites = await findFavoriteByOwnerId(userId);
  const result = [];
  for (const favorite of favorites) {
    const favoriteId = favorite._id.toString();
    const collections = (await findCollectionByFavoriteId(favoriteId)).filter(
      (item) => {
        return !item.isCancel;
      }
    );
    for (const collection of collections) {
      if (collection.articleId === articleId) {
        result.push(favoriteId);
        break;
      }
    }
  }
  responseBody.data = result;
  await next();
};

export const createFavorite: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { favoriteName } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  const result = await create(userId, favoriteName);
  responseBody.setDataProperty("favoriteId", result.insertedId.toString());
  await next();
};

export const updateFavorite: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { favoriteId, favoriteName } = ctx.request.body as Record<string, any>;
  const result = await findFavoriteById(favoriteId);
  if (!result.length) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  await updateFavoriteNameById(new ObjectId(favoriteId), favoriteName);
  await next();
};

export const deleteFavorite: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { favoriteId } = ctx.request.body as Record<string, any>;
  const result = await findFavoriteById(favoriteId);
  if (!result.length) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  const reuslt = await deleteFavoriteById(new ObjectId(favoriteId));
  await next();
};
