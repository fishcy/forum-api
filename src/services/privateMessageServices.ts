import { Sort } from "mongodb";
import privateMessageDao from "../dao/privateMessageDao";
import { PrivateMessage } from "../models/privateMessage";

export const createPrivateMessage = async (
  senderUserId: string,
  receiverUserId: string,
  content: string,
  createTime?: number
) => {
  return await privateMessageDao.createPrivateMessage(
    new PrivateMessage(senderUserId, receiverUserId, content, createTime)
  );
};

export const findPrivateMessageByOneUserId = async (
  userId: string,
  sort: Sort = {}
) => {
  return await privateMessageDao.findPrivateMessage(
    {
      $or: [{ senderUserId: userId }, { receiverUserId: userId }],
    },
    {},
    sort
  );
};

export const findNotDeletePrivateMessageByOneUserId = async (
  userId: string,
  sort: Sort = {}
) => {
  return await privateMessageDao.findPrivateMessage(
    {
      $or: [
        {
          senderUserId: userId,
          senderDeleteEntry: 0,
        },
        {
          receiverUserId: userId,
          receiverDeleteEntry: 0,
        },
      ],
    },
    {},
    sort
  );
};

export const findPrivateMessageByTwoUserId = async (
  userId: string,
  anotherUserId: string,
  sort: Sort = {},
  skipNum?: number,
  limitNum?: number
) => {
  return await privateMessageDao.findPrivateMessage(
    {
      $or: [
        {
          senderUserId: userId,
          receiverUserId: anotherUserId,
        },
        {
          senderUserId: anotherUserId,
          receiverUserId: userId,
        },
      ],
    },
    {},
    sort,
    skipNum,
    limitNum
  );
};

export const countPrivateMessageByTwoUserId = async (
  userId: string,
  anotherUserId: string
) => {
  return await privateMessageDao.countPrivateMessage({
    $or: [
      {
        senderUserId: userId,
        receiverUserId: anotherUserId,
        senderDeleteEntry: 0,
      },
      {
        senderUserId: anotherUserId,
        receiverUserId: userId,
        receiverDeleteEntry: 0,
      },
    ],
  });
};
