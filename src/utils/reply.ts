import {
  findThumbsUpByItemId,
  findThumbsUpNotCancel,
} from "../services/thumbsUpServices";
import { Reply } from "../models/reply";
import { formatUserInfo } from "./user";
import { findReplyByItemId } from "../services/replyServices";

const visit = new Set();

// 获取评论的回复
export const getReplys = async (itemId: string): Promise<any[]> => {
  if (visit.has(itemId)) return;
  visit.add(itemId);
  const replys = await findReplyByItemId(itemId);
  for (let i = 0; i < replys.length; ++i) {
    if (visit.has(replys[i]._id.toString())) continue;
    visit.add(replys[i]._id.toString());
    replys.push(...(await findReplyByItemId(replys[i]._id.toString())));
  }
  visit.clear();
  const result: any[] = [];
  for (const reply of replys) {
    result.push(await formatReply(reply));
  }
  return result;
};

export const formatReply = async (reply: Reply) => {
  const like_num = (await findThumbsUpByItemId(reply._id.toString())).length;
  const is_like = (
    await findThumbsUpNotCancel(reply._id.toString(), reply.userId)
  ).length;
  return {
    reply_id: reply._id.toString(),
    reply_info: {
      reply_comment: reply.replyContent,
      reply_image: reply.replyImage,
      create_time: reply.createTime,
      like_num,
      is_like,
    },
    user_info: await formatUserInfo(reply.userId),
    reply_user: await formatUserInfo(reply.replyToUserId),
  };
};
