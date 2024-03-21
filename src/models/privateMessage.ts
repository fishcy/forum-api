import { ObjectId } from "mongodb";

export class PrivateMessage {
  _id!: ObjectId;
  senderUserId: string;
  receiverUserId: string;
  senderDeleteEntry: number;
  receiverDeleteEntry: number;
  createTime: number;
  content: string;
  constructor(
    senderUserId: string,
    receiverUserId: string,
    content: string,
    createTime: number = Date.now()
  ) {
    this.senderUserId = senderUserId;
    this.receiverUserId = receiverUserId;
    this.senderDeleteEntry = 0;
    this.receiverDeleteEntry = 0;
    this.createTime = createTime;
    this.content = content;
  }
}
