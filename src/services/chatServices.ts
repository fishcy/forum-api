import chatDao from "../dao/chatDao";
import { Chat } from "../models/chat";

export const createChat = async (
  senderUserId: string,
  receiverUserId: string
) => {
  return await chatDao.createChat(new Chat(senderUserId, receiverUserId));
};

export const findChatByOneUserId = async (userId: string) => {
  return await chatDao.findChat({
    $or: [{ senderUserId: userId }, { receiverUserId: userId }],
  });
};

export const findNotDeleteChatByOneUserId = async (userId: string) => {
  return await chatDao.findChat({
    $or: [
      { senderUserId: userId, senderDeleteEntry: 0 },
      { receiverUserId: userId, receiverDeleteEntry: 0 },
    ],
  });
};

export const findChatByTwoUserId = async (
  userId: string,
  anotherUserId: string
) => {
  return await chatDao.findChat({
    $or: [
      { senderUserId: userId, receiverUserId: anotherUserId },
      { senderUserId: anotherUserId, receiverUserId: userId },
    ],
  });
};

export const updateChatSenderDeleteEntry = async (
  senderUserId: string,
  receiverUserId: string,
  senderDeleteEntry: number
) => {
  return await chatDao.updateChat(
    { senderUserId, receiverUserId },
    {
      $set: {
        senderDeleteEntry,
      },
    }
  );
};

export const updateChatReceiverDeleteEntry = async (
  senderUserId: string,
  receiverUserId: string,
  receiverDeleteEntry: number
) => {
  return await chatDao.updateChat(
    { senderUserId, receiverUserId },
    {
      $set: {
        receiverDeleteEntry,
      },
    }
  );
};
