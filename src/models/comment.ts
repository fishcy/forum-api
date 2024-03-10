import { ObjectId } from "mongodb";

export class Comment {
  _id!: ObjectId;
  itemId: string;
  userId: string;
  commentContent: string;
  commentImage: string;
  createTime: number;
  isDelete: number;
  constructor(
    itemId: string,
    userId: string,
    commentContent: string,
    commentImage: string
  ) {
    this.itemId = itemId;
    this.userId = userId;
    this.commentContent = commentContent;
    this.commentImage = commentImage;
    this.createTime = Date.now();
    this.isDelete = 0;
  }
}
