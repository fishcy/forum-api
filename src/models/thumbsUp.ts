import { ObjectId } from "mongodb";

export class ThumbsUp {
  _id!: ObjectId;
  itemId: string;
  userId: string;
  isCancel: number;
  constructor(itemId: string, userId: string) {
    this.itemId = itemId;
    this.userId = userId;
    this.isCancel = 0;
  }
}
