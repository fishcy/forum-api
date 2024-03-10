import { ObjectId } from "mongodb";

export class Reply {
  _id!: ObjectId;
  itemId: string;
  userId: string;
  replyContent: string;
  replyImage: string;
  createTime: number;
  replyToUserId: string;
  isDelete: number;
  constructor(
    itemId: string,
    userId: string,
    replyContent: string,
    replyImage: string,
    replyToUserId: string
  ) {
    this.itemId = itemId;
    this.userId = userId;
    this.replyContent = replyContent;
    this.replyImage = replyImage;
    this.createTime = Date.now();
    this.replyToUserId = replyToUserId;
    this.isDelete = 0;
  }
}
