import { ObjectId } from "mongodb";

export class Article {
  _id!: ObjectId;
  title: string;
  textContent: string;
  htmlContent: string;
  coverImage: string;
  authorId: ObjectId;
  createTime: number;
  isDelete: number;
  viewNum: number;
  constructor(
    title: string,
    textContent: string,
    htmlContent: string,
    authorId: ObjectId,
    coverImage?: string
  ) {
    this.title = title;
    this.textContent = textContent;
    this.htmlContent = htmlContent;
    this.coverImage = coverImage ? coverImage : "";
    this.authorId = authorId;
    this.createTime = Date.now();
    this.isDelete = 0;
    this.viewNum = 0;
  }
}
