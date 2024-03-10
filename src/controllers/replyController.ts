import { IMiddleware } from "koa-router";
import {
  createReply,
  findReplyById,
  findReplyByItemId,
} from "../services/replyServices";
import { ResponseBody } from "../middleware/responseBody";
import { findCommentById } from "../services/commentServices";
import { ObjectId } from "mongodb";
import { formatReply } from "../utils/reply";

export const uploadReply: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const userId = ctx.state.payload._id;
  const { itemId, replyContent, replyImage, replyToUserId } = ctx.request
    .body as Record<string, any>;
  const result = [
    ...(await findCommentById(new ObjectId(itemId))),
    ...(await findReplyById(new ObjectId(itemId))),
  ];
  if (!result.length) {
    responseBody.setMsg("回复失败");
    return;
  }
  const reply = await createReply(
    itemId,
    userId,
    replyContent,
    replyImage,
    replyToUserId
  );
  const replyEntry = await findReplyById(reply.insertedId);
  responseBody.data = await formatReply(replyEntry[0]);
  await next();
};

export const getReplys: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { itemId } = ctx.request.query as Record<string, any>;
  const result = await findCommentById(new ObjectId(itemId));
  if (!result.length) {
    responseBody.setMsg("获取评论失败");
    return;
  }
  const replys = await findReplyByItemId(itemId);
  const replyList = [];
  for (const reply of replys) {
    replyList.push(await formatReply(reply));
  }
  responseBody.data = replyList;
  await next();
};
