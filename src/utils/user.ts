import { ObjectId } from "mongodb";
import { findUser } from "../services/userServices";

export const formatUserInfo = async (userId: string) => {
  const user = await findUser(new ObjectId(userId));
  return {
    user_id: userId,
    user_name: user?.username || "",
    avatar: user?.avatar || "",
  };
};
