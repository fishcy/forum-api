import { IMiddleware } from "koa-router";
import {
  createComment,
  deleteCommentById,
  findCommentById,
  findCommentByItemId,
} from "../services/commentServices";
import { ResponseBody } from "../middleware/responseBody";
import { findArticlesById } from "../services/articleServices";
import { ObjectId } from "mongodb";
import { formatComment } from "../utils/comment";

export const uploadComment: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const userId = ctx.state.payload._id;
  const { type, itemId, commentContent, commentImage } = ctx.request
    .body as Record<string, any>;
  let result;
  // 文章
  if (type === 1) {
    result = await findArticlesById(new ObjectId(itemId));
  } // 评论
  else if (type === 2) {
    result = await findCommentById(new ObjectId(itemId));
  }
  if (!result.length) {
    // 文章或评论不存在
    responseBody.setMsg("评论失败");
    return;
  }
  const comment = await createComment(
    itemId,
    userId,
    commentContent,
    commentImage
  );
  const commentEntry = await findCommentById(comment.insertedId);
  responseBody.data = await formatComment(commentEntry[0]);
  await next();
};

// 获取评论
export const getComments: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { type, itemId } = ctx.request.query as Record<string, any>;
  let result;
  // 文章
  if (type === "1") {
    result = await findArticlesById(new ObjectId(itemId));
  }
  // 评论
  else if (type === "2") {
    result = await findCommentById(new ObjectId(itemId));
  }
  if (!result.length) {
    responseBody.setMsg("获取评论失败");
    return;
  }
  const comments = await findCommentByItemId(itemId);
  const commentList = [];
  for (const comment of comments) {
    commentList.push(await formatComment(comment));
  }
  responseBody.data = commentList;
  await next();
};

export const deleteComment: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { comment_id } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  const comments = await findCommentById(new ObjectId(comment_id));
  for (const comment of comments) {
    if (comment.userId.toString() === userId) {
      await deleteCommentById(new ObjectId(comment_id));
      responseBody.setMsg("删除成功");
      await next();
      return;
    }
  }
  responseBody.setMsg("评论不存在");
};
