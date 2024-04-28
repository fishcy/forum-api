import { IMiddleware } from "koa-router";
import { ResponseBody } from "../middleware/responseBody";

import {
  createArticle,
  searchArticles,
  findArticlesById,
  findArticlesByAuthorId,
  deleteArticleByArticleId,
  viewNumPlusOne,
} from "../services/articleServices";
import { ObjectId } from "mongodb";
import { ASSETS_URL } from "../../config/environment";
import { formatArticle, formatArticleDetail } from "../utils/article";
import { findUser } from "../services/userServices";

export const uploadImage: IMiddleware = async (ctx, next) => {
  const file = ctx.request.file;
  const responseBody = ctx.body as ResponseBody;
  responseBody.setDataProperty("originalname", file["originalname"]);
  responseBody.setDataProperty("url", `${ASSETS_URL}/${file["filename"]}`);
  responseBody.setDataProperty("size", file["size"]);
  responseBody.setDataProperty("filename", file["filename"]);
  await next();
};

export const uploadArticle: IMiddleware = async (ctx, next) => {
  const { title, textContent, htmlContent, coverImage } = ctx.request
    .body as Record<string, any>;
  const userId = ctx.state.payload._id;
  const result = await createArticle(
    title,
    textContent,
    htmlContent,
    new ObjectId(userId),
    coverImage
  );
  const responseBody = ctx.body as ResponseBody;
  responseBody.setDataProperty("title", title);
  responseBody.setDataProperty("article_id", result.insertedId.toString());
  ctx.state.articleId = result.insertedId.toString();
  await next();
};

// 后面还要修改
export const showArticle: IMiddleware = async (ctx, next) => {
  const { userId } = ctx.query as Record<string, any>;
  const responseBody = ctx.body as ResponseBody;
  const result = await searchArticles("");
  const articleList = [];
  for (const item of result) {
    const res = await formatArticle(item, userId);
    articleList.push(res);
  }
  responseBody.setDataProperty("articleList", articleList);
  await next();
};

export const getArticleDetail: IMiddleware = async (ctx, next) => {
  const userId = ctx.state.payload?._id || "";
  const responseBody = ctx.body as ResponseBody;
  const { article_id } = ctx.request.query as Record<string, any>;
  const result = await findArticlesById(new ObjectId(article_id));
  if (result.length) {
    const article = result[0];
    await viewNumPlusOne(new ObjectId(article_id), article.viewNum + 1);
    const article_info = await formatArticleDetail(article, userId);
    responseBody.setDataProperty("article_id", article_id);
    responseBody.setDataProperty("article_info", article_info);
    await next();
  } else {
    responseBody.setMsg("文章不存在");
    return;
  }
};

export const getUserArticles: IMiddleware = async (ctx, next) => {
  const userId = ctx.state.payload?._id || "";
  const responseBody = ctx.body as ResponseBody;
  const { user_id } = ctx.request.query;
  const result = await findArticlesByAuthorId(new ObjectId(user_id as string));
  const articleList = [];
  for (const item of result) {
    const res = await formatArticle(item, userId);
    articleList.push(res);
  }
  responseBody.setDataProperty("own_articles", articleList);
  await next();
};

export const deleteArticle: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const userId = ctx.state.payload?._id || "";
  const { article_id } = ctx.request.body as Record<string, any>;
  const articles = await findArticlesById(new ObjectId(article_id));
  for (const article of articles) {
    if (article.authorId.toString() === userId) {
      await deleteArticleByArticleId(new ObjectId(article_id));
      responseBody.setMsg("删除成功");
      await next();
      return;
    }
  }
  responseBody.setMsg("文章不存在");
};
