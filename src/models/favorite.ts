import { ObjectId } from "mongodb";

export class Favorite {
  _id!: ObjectId;
  ownerId: string;
  favoriteName: string;
  isDelete: number;

  constructor(ownerId: string, favoriteName: string) {
    this.ownerId = ownerId;
    this.favoriteName = favoriteName;
    this.isDelete = 0;
  }
}
