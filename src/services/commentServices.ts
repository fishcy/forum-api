import { ObjectId } from "mongodb";
import commentDao from "../dao/commentDao";
import { Comment } from "../models/comment";

export const createComment = async (
  itemId: string,
  userId: string,
  commentContent: string,
  commentImage: string
) => {
  return await commentDao.createComment(
    new Comment(itemId, userId, commentContent, commentImage)
  );
};

export const findCommentByItemId = async (itemId: string) => {
  return await commentDao.findComment({
    isDelete: 0,
    itemId,
  });
};

export const findCommentById = async (_id: ObjectId) => {
  return await commentDao.findComment({
    isDelete: 0,
    _id,
  });
};

export const deleteCommentById = async (_id: ObjectId) => {
  return await commentDao.updateComment(
    {
      _id,
    },
    {
      $set: {
        isDelete: 1,
      },
    }
  );
};
