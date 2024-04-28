import { IMiddleware } from "koa-router";
import { findFansByFolloweeId } from "../services/attentionServices";
import { pushArticleNotificationToFans } from "../websocket";
import { findArticlesById } from "../services/articleServices";
import { ObjectId } from "mongodb";
import { formatArticleNotification } from "../utils/article";

export const pushArticleNotification: IMiddleware = async (ctx, next) => {
  const userId = ctx.state.payload._id;
  const fans = (await findFansByFolloweeId(userId)).map((item) => item.fansId);
  const articleId = ctx.state.articleId;
  const article = (await findArticlesById(new ObjectId(articleId)))[0];
  const notification = await formatArticleNotification(article);
  pushArticleNotificationToFans(fans, notification);
  await next();
};
