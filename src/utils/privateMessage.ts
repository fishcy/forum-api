import { PrivateMessage } from "../models/privateMessage";

export const formatChatRecord = (chatRecord: PrivateMessage) => {
  return {
    sender_user_id: chatRecord.senderUserId,
    receiver_user_id: chatRecord.receiverUserId,
    content: chatRecord.content,
    create_time: chatRecord.createTime,
  };
};
