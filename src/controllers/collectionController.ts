import { IMiddleware } from "koa-router";
import { ResponseBody } from "../middleware/responseBody";
import { findFavoriteById } from "../services/favoriteServices";
import {
  cancelCollection,
  collect,
  createCollection,
  findCollectionByFavoriteId,
} from "../services/collectionServices";
import { formatArticle } from "../utils/article";
import { findArticlesById } from "../services/articleServices";
import { ObjectId } from "mongodb";

export const getCollection: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { ownerId, favoriteId } = ctx.request.query as Record<string, any>;
  const favorites = await findFavoriteById(favoriteId);
  if (!favorites.length) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  const favorite = favorites[0];
  if (favorite.ownerId !== ownerId) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  const collections = (await findCollectionByFavoriteId(favoriteId)).filter(
    (item) => {
      return !item.isCancel;
    }
  );
  const userId = ctx.state.payload._id;
  const result = [];
  for (const collection of collections) {
    const article = (
      await findArticlesById(new ObjectId(collection.articleId))
    )[0];
    result.push(await formatArticle(article, userId));
  }
  responseBody.data = result;
  await next();
};

export const collectArticle: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { articleId, favoriteId } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  const favorites = await findFavoriteById(favoriteId);
  if (!favorites.length) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  const favorite = favorites[0];
  if (favorite.ownerId !== userId) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  const result = await findCollectionByFavoriteId(favoriteId);
  const collection = result.find((item) => {
    return item.articleId === articleId;
  });

  if (!collection) {
    await createCollection(articleId, favoriteId);
    await next();
    return;
  }

  if (!collection.isCancel) {
    responseBody.setMsg("已收藏");
    return;
  }
  await collect(articleId, favoriteId);
  await next();
};

export const cancelArticleCollection: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { articleId, favoriteId } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  const favorites = await findFavoriteById(favoriteId);
  if (!favorites.length) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  const favorite = favorites[0];
  if (favorite.ownerId !== userId) {
    responseBody.setMsg("收藏夹不存在");
    return;
  }
  const result = await findCollectionByFavoriteId(favoriteId);
  const collection = result.find((item) => {
    return item.articleId === articleId;
  });
  if (!collection || collection.isCancel) {
    responseBody.setMsg("未收藏");
    return;
  }
  await cancelCollection(articleId, favoriteId);
  await next();
};
