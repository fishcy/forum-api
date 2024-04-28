import { IMiddleware } from "koa-router";
import { ResponseBody } from "../middleware/responseBody";
import {
  cancelFollow,
  createAttention,
  findAllAttentionRecord,
  follow,
} from "../services/attentionServices";

export const followUser: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { followee_id } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  const result = await findAllAttentionRecord(userId, followee_id);
  if (result.length) {
    if (result[0].isCancel) {
      await follow(userId, followee_id);
    } else {
      responseBody.setMsg("已关注");
    }
  } else {
    await createAttention(userId, followee_id);
  }
  await next();
};

export const cancelFollowUser: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { followee_id } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  const result = await findAllAttentionRecord(userId, followee_id);
  if (result.length) {
    if (result[0].isCancel) {
      responseBody.setMsg("未关注");
    } else {
      await cancelFollow(userId, followee_id);
    }
  } else {
    responseBody.setMsg("未关注");
  }
  await next();
};
