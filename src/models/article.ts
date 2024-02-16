import { ObjectId } from "mongodb";

export class Article {
  _id!: ObjectId;
  title: string;
  content: string;
  coverImage: string;
  authorId: ObjectId;
  createTime: number;
  isDelete: number;
  likeNum: number;
  viewNum: number;
  constructor(
    title: string,
    content: string,
    authorId: ObjectId,
    coverImage?: string
  ) {
    this.title = title;
    this.content = content;
    this.coverImage = coverImage ? coverImage : "";
    this.authorId = authorId;
    this.createTime = Date.now();
    this.isDelete = 0;
    this.likeNum = 0;
    this.viewNum = 0;
  }
}
