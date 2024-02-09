import { IMiddleware } from "koa-router";
import { ResponseBody } from "../middleware/responseBody";

import { createArticle, findArticles } from "../services/articleServices";
import { ObjectId } from "mongodb";
import { ASSETS_URL } from "../../config/environment";

export const uploadImage: IMiddleware<any, {}> = async (ctx, next) => {
  const file = ctx.request.file;
  (ctx.body as ResponseBody).setDataProperty(
    "originalname",
    file["originalname"]
  );
  (ctx.body as ResponseBody).setDataProperty(
    "url",
    `${ASSETS_URL}/${file["filename"]}`
  );
  (ctx.body as ResponseBody).setDataProperty("size", file["size"]);
  (ctx.body as ResponseBody).setDataProperty("filename", file["filename"]);
};

export const uploadArticle: IMiddleware<any, {}> = async (ctx, next) => {
  const { title, content } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  await createArticle(title, content, new ObjectId(userId));
  await next();
};

// 后面还要修改
export const showArticle: IMiddleware<any, {}> = async (ctx, next) => {
  const articleList = (await findArticles("")).map((item) => {
    return {
      article_id: item._id.toString(),
      title: item.title,
      brief_content: item.content.substring(0, 30),
      author_id: item.authorId.toString(),
      create_time: item.createTime,
    };
  });
  (ctx.body as ResponseBody).setDataProperty("articleList", articleList);
  await next();
};
