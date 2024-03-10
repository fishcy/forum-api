import { Comment } from "../models/comment";
import {
  findThumbsUpByItemId,
  findThumbsUpNotCancel,
} from "../services/thumbsUpServices";
import { formatUserInfo } from "./user";
import { formatReply, getReplys } from "./reply";
import { findReplyByItemId } from "../services/replyServices";


// 格式化 响应数据结构
export const formatComment = async (comment: Comment) => {
  const like_num = (await findThumbsUpByItemId(comment._id.toString())).length;
  const is_like = (
    await findThumbsUpNotCancel(comment._id.toString(), comment.userId)
  ).length;
  const reply_infos = await getReplys(comment._id.toString());

  return {
    comment_id: comment._id.toString(),
    comment_info: {
      comment_content: comment.commentContent,
      comment_image: comment.commentImage,
      create_time: comment.createTime,
      like_num,
      is_like,
    },
    user_info: await formatUserInfo(comment.userId),
    reply_infos,
  };
};
