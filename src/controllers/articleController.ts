import { IMiddleware } from "koa-router";
import { ResponseBody } from "../middleware/responseBody";

import {
  createArticle,
  searchArticles,
  findArticlesById,
  findArticlesByAuthorId,
} from "../services/articleServices";
import { ObjectId } from "mongodb";
import { ASSETS_URL } from "../../config/environment";
import { formatArticle } from "../utils/article";

export const uploadImage: IMiddleware<any, {}> = async (ctx, next) => {
  const file = ctx.request.file;
  const responseBody = ctx.body as ResponseBody;
  responseBody.setDataProperty("originalname", file["originalname"]);
  responseBody.setDataProperty("url", `${ASSETS_URL}/${file["filename"]}`);
  responseBody.setDataProperty("size", file["size"]);
  responseBody.setDataProperty("filename", file["filename"]);
  await next();
};

export const uploadArticle: IMiddleware<any, {}> = async (ctx, next) => {
  const { title, content } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  await createArticle(title, content, new ObjectId(userId));
  await next();
};

// 后面还要修改
export const showArticle: IMiddleware<any, {}> = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const articleList = (await searchArticles("")).map(formatArticle);
  responseBody.setDataProperty("articleList", articleList);
  await next();
};

export const getArticleDetail: IMiddleware<any, {}> = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { article_id } = ctx.request.query as Record<string, any>;
  const result = await findArticlesById(new ObjectId(article_id));
  if (result.length) {
    const article = result[0];
    const article_info = {
      author_id: article.authorId.toString(),
      title: article.title,
      content: article.content,
      create_time: article.createTime,
    };
    responseBody.setDataProperty("article_id", article_id);
    responseBody.setDataProperty("article_info", article_info);
    await next();
  } else {
    responseBody.setMsg("文章不存在");
    return;
  }
};

export const getUserArticles: IMiddleware<any, {}> = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { _id } = ctx.state.payload;
  const result = (await findArticlesByAuthorId(new ObjectId(_id))).map(
    formatArticle
  );
  responseBody.setDataProperty("own_articles", result);
  await next();
};
