import { ObjectId } from "mongodb";
import { findUser } from "../services/userServices";
import {
  countFansByFolloweeId,
  countFolloweeByFansId,
  findAttentionRecord,
} from "../services/attentionServices";

export const formatUserInfo = async (userId: string) => {
  const user = await findUser(new ObjectId(userId));
  return {
    user_id: userId,
    user_name: user?.username || "",
    avatar: user?.avatar || "",
  };
};

export const formatUserCardInfo = async (
  userId: string,
  login_user_id: string
) => {
  const followee_num = await countFolloweeByFansId(userId);
  const fans_num = await countFansByFolloweeId(userId);
  const is_followed = (await findAttentionRecord(login_user_id, userId)).length;
  return {
    ...(await formatUserInfo(userId)),
    followee_num,
    fans_num,
    is_followed,
  };
};
