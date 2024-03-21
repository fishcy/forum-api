import { IMiddleware } from "koa-router";
import {
  createChat,
  findChatByOneUserId,
  findChatByTwoUserId,
  findNotDeleteChatByOneUserId,
  updateChatReceiverDeleteEntry,
  updateChatSenderDeleteEntry,
} from "../services/chatServices";
import { ResponseBody } from "../middleware/responseBody";
import { checkUserExist } from "../services/userServices";
import { ObjectId } from "mongodb";
import { formatUserInfo } from "../utils/user";
import { findPrivateMessageByTwoUserId } from "../services/privateMessageServices";

export const uploadChat: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { senderUserId, receiverUserId } = ctx.request.query as Record<
    string,
    any
  >;
  const userExist =
    (await checkUserExist(new ObjectId(senderUserId))) &&
    (await checkUserExist(new ObjectId(receiverUserId)));
  if (!userExist) {
    responseBody.setMsg("用户不存在");
    return;
  }

  const chatEntry = await findChatByTwoUserId(senderUserId, receiverUserId);
  if (chatEntry.length) {
    const chat = chatEntry[0];
    if (chat.senderUserId === senderUserId) {
      if (chat.senderDeleteEntry) {
        await updateChatSenderDeleteEntry(senderUserId, receiverUserId, 0);
      }
    } else if (chat.receiverUserId === senderUserId) {
      if (chat.receiverDeleteEntry) {
        await updateChatReceiverDeleteEntry(receiverUserId, senderUserId, 0);
      }
    }
    return;
  } else {
    await createChat(senderUserId, receiverUserId);
  }
  await next();
};

export const getChatList: IMiddleware = async (ctx, next) => {
  const result = [];
  const { senderUserId } = ctx.request.query as Record<string, any>;
  const chatList = await findNotDeleteChatByOneUserId(senderUserId);
  for (const chat of chatList) {
    const receiveruserId =
      chat.senderUserId === senderUserId
        ? chat.receiverUserId
        : chat.senderUserId;
    const receiverUserInfo = await formatUserInfo(receiveruserId);
    const messageList = await findPrivateMessageByTwoUserId(
      senderUserId,
      receiveruserId,
      {
        createTime: -1,
      }
    );
    const response = { content: "", create_time: Date.now() };
    if (messageList.length) {
      response.content = messageList[0].content;
      response.create_time = messageList[0].createTime;
    }
    Object.assign(response, receiverUserInfo);
    result.push(response);
  }
  ctx.body.data = result;
  await next();
};
