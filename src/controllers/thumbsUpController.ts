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
import { findCommentById } from "../services/commentServices";
import { findReplyById } from "../services/replyServices";

export const thumbsUp: IMiddleware = async (ctx, next) => {
  const ResponseBody = ctx.body as ResponseBody;
  const userId = ctx.state.payload?._id || "";
  const { itemId, type } = ctx.request.body as Record<string, any>;
  let result;
  // 文章
  if (type === 1) {
    result = await findArticlesById(new ObjectId(itemId));
  }
  // 评论
  else if (type === 2) {
    result = [
      ...(await findCommentById(new ObjectId(itemId))),
      ...(await findReplyById(new ObjectId(itemId))),
    ];
  }
  if (!result.length) {
    ResponseBody.setMsg("点赞内容不存在");
    return;
  }

  // 查看是否存在点赞条目
  const thumbsUpEntry = await findThumbsUpAll(itemId, userId);
  // 存在
  if (thumbsUpEntry.length) {
    // 且已经被取消，则重新设为被点赞状态
    if (thumbsUpEntry[0].isCancel) {
      await thumbsUpOrCancel(itemId, userId, 0);
    }
  } else {
    // 不存在则创建
    await createThumbsUp(itemId, userId);
  }

  await next();
};

export const cancelThumbsUp: IMiddleware = async (ctx, next) => {
  const ResponseBody = ctx.body as ResponseBody;
  const userId = ctx.state.payload?._id || "";
  const { itemId, type } = ctx.request.body as Record<string, any>;
  let result;
  // 文章
  if (type === 1) {
    result = await findArticlesById(new ObjectId(itemId));
  }
  // 评论
  else if (type === 2) {
    result = [
      ...(await findCommentById(new ObjectId(itemId))),
      ...(await findReplyById(new ObjectId(itemId))),
    ];
  }

  if (!result.length) {
    ResponseBody.setMsg("点赞内容不存在");
    return;
  }

  const thumbsUpEntry = await findThumbsUpNotCancel(itemId, userId);
  // 点赞条目存在
  if (thumbsUpEntry.length) {
    thumbsUpOrCancel(itemId, userId, 1);
  }
  // 点赞条目不存在，不能取消点赞
  else {
    ResponseBody.setMsg("该用户未点赞或点赞内容不存在");
  }
  await next();
};
