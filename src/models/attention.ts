import { ObjectId } from "mongodb";

export class Attention {
  _id!: ObjectId;
  fansId: string;
  followeeId: string;
  isCancel: number;
  constructor(fansId: string, followeeId: string) {
    this.fansId = fansId;
    this.followeeId = followeeId;
    this.isCancel = 0;
  }
}
