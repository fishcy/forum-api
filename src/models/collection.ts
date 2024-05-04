import { ObjectId } from "mongodb";

export class Collection {
  _id!: ObjectId;
  articleId: string;
  favoriteId: string;
  isCancel: number;
  constructor(articleId: string, favoriteId: string) {
    this.articleId = articleId;
    this.favoriteId = favoriteId;
    this.isCancel = 0;
  }
}
