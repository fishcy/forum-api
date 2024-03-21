import { IMiddleware } from "koa-router";
import { ResponseBody } from "../middleware/responseBody";
import { checkUserExist } from "../services/userServices";
import { ObjectId } from "mongodb";
import {
  countPrivateMessageByTwoUserId,
  findPrivateMessageByTwoUserId,
} from "../services/privateMessageServices";
import { formatChatRecord } from "../utils/privateMessage";

export const getChatRecord: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { senderUserId, receiverUserId, page, pageSize } = ctx.request
    .query as Record<string, any>;
  const userExist =
    (await checkUserExist(new ObjectId(senderUserId))) &&
    (await checkUserExist(new ObjectId(receiverUserId)));
  if (!userExist) {
    responseBody.setMsg("用户不存在");
    return;
  }
  const chatRecord = (
    await findPrivateMessageByTwoUserId(
      senderUserId,
      receiverUserId,
      {
        createTime: -1,
      },
      (+page - 1) * +pageSize,
      +pageSize
    )
  )
    .filter((item) => {
      if (item.senderUserId === senderUserId && item.senderDeleteEntry)
        return false;
      if (item.receiverUserId === senderUserId && item.receiverDeleteEntry)
        return false;
      return true;
    })
    .map(formatChatRecord);
  const totalNum = await countPrivateMessageByTwoUserId(
    senderUserId,
    receiverUserId
  );
  responseBody.setDataProperty("totalPage", Math.ceil(totalNum / pageSize));
  responseBody.setDataProperty("messages", chatRecord);
  await next();
};
