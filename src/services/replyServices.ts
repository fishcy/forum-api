import { ObjectId } from "mongodb";
import replyDao from "../dao/replyDao";
import { Reply } from "../models/reply";

export const createReply = async (
  itemId: string,
  userId: string,
  replyContent: string,
  replyImage: string,
  replyToUserId: string
) => {
  return await replyDao.createReply(
    new Reply(itemId, userId, replyContent, replyImage, replyToUserId)
  );
};

export const findReplyByItemId = async (itemId: string) => {
  return await replyDao.findReply({
    isDelete: 0,
    itemId,
  });
};

export const findReplyById = async (_id: ObjectId) => {
  return await replyDao.findReply({
    isDelete: 0,
    _id,
  });
};

export const deleteReplyById = async (_id: ObjectId) => {
  return await replyDao.updateReply(
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
