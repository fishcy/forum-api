import { IMiddleware } from "koa-router";
import { ResponseBody } from "../middleware/responseBody";
import {
  createThumbsUp,
  findThumbsUpAll,
  findThumbsUpCancel,
  findThumbsUpNotCancel,
  thumbsUpOrCancel,
} from "../services/thumbsUpServices";
import { findArticlesById } from "../services/articleServices";
import { ObjectId } from "mongodb";

export const thumbsUp: IMiddleware = async (ctx, next) => {
  const ResponseBody = ctx.body as ResponseBody;
  const userId = ctx.state.payload?._id || "";
  const { itemId, type } = ctx.request.body as Record<string, any>;
  // 文章
  if (type === 1) {
    const result = await findArticlesById(new ObjectId(itemId));
    // 文章存在
    if (result.length) {
      // 查找是否有没有点赞过的条目
      const thumbsUpEntry = await findThumbsUpCancel(itemId, userId);
      // 点赞条目存在
      if (thumbsUpEntry.length) {
        thumbsUpOrCancel(itemId, userId, 0);
      }
      // 点赞条目不存在，新建
      else {
        if ((await findThumbsUpAll(itemId, userId)).length) {
          return;
        }
        await createThumbsUp(itemId, userId);
      }
    } else {
      ResponseBody.setMsg("点赞文章不存在");
      return;
    }
  }
  // 评论
  else if (type === 2) {
  }
  await next();
};

export const cancelThumbsUp: IMiddleware = async (ctx, next) => {
  const ResponseBody = ctx.body as ResponseBody;
  const userId = ctx.state.payload?._id || "";
  const { itemId, type } = ctx.request.body as Record<string, any>;
  // 文章
  if (type === 1) {
    const result = await findArticlesById(new ObjectId(itemId));
    // 文章存在
    if (result.length) {
      const thumbsUpEntry = await findThumbsUpNotCancel(itemId, userId);
      // 点赞条目存在
      if (thumbsUpEntry.length) {
        thumbsUpOrCancel(itemId, userId, 1);
      }
      // 点赞条目不存在，不能取消点赞
      else {
        ResponseBody.setMsg("该用户未点赞或文章不存在");
      }
    } else {
      ResponseBody.setMsg("点赞文章不存在");
      return;
    }
  }
  // 评论
  else if (type === 2) {
  }
  await next();
};
