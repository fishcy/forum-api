import { ObjectId } from "mongodb";

export class Chat {
  _id!: ObjectId;
  senderUserId: string;
  receiverUserId: string;
  senderDeleteEntry: number;
  receiverDeleteEntry: number;
  constructor(senderUserId: string, receiverUserId: string) {
    this.senderUserId = senderUserId;
    this.receiverUserId = receiverUserId;
    this.senderDeleteEntry = 0;
    this.receiverDeleteEntry = 0;
  }
}
