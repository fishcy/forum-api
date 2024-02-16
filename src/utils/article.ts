import { Article } from "../models/article";

export const formatArticle = (item: Article) => {
  return {
    article_id: item._id.toString(),
    title: item.title,
    brief_content: item.content.substring(0, 30),
    author_id: item.authorId.toString(),
    create_time: item.createTime,
    like_num: item.likeNum,
    view_num: item.viewNum,
  };
};
