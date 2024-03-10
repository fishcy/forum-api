import thumbsUpDao from "../dao/thumbsUpDao";
import { ThumbsUp } from "../models/thumbsUp";

export const createThumbsUp = async (itemId: string, userId: string) => {
  return await thumbsUpDao.createThumbsUp(new ThumbsUp(itemId, userId));
};

// 通过itemId查找对应的所有已点赞的点赞条目
export const findThumbsUpByItemId = async (itemId: string) => {
  return await thumbsUpDao.findThumbsUp({
    itemId,
    isCancel: 0,
  });
};

// 通过userId查找用户已点赞的所有点赞条目
export const findThumbsUpByUserId = async (userId: string) => {
  return await thumbsUpDao.findThumbsUp({
    userId,
    isCancel: 0,
  });
};

export const findThumbsUpNotCancel = async (itemId: string, userId: string) => {
  return await thumbsUpDao.findThumbsUp({
    itemId,
    userId,
    isCancel: 0,
  });
};

export const findThumbsUpCancel = async (itemId: string, userId: string) => {
  return await thumbsUpDao.findThumbsUp({
    itemId,
    userId,
    isCancel: 1,
  });
};

export const findThumbsUpAll = async (itemId: string, userId: string) => {
  return await thumbsUpDao.findThumbsUp({
    itemId,
    userId,
  });
};

type choice = 0 | 1;
export const thumbsUpOrCancel = async (
  itemId: string,
  userId: string,
  isCancel: choice
) => {
  return await thumbsUpDao.updateThumbsUp(
    { itemId, userId },
    {
      $set: {
        isCancel,
      },
    }
  );
};
