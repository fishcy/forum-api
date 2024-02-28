import { Article } from "../models/article";
import { findUser } from "../services/userServices";

export const formatArticle = async (item: Article) => {
  const result = await findUser(item.authorId);
  return {
    article_id: item._id.toString(),
    title: item.title,
    brief_content: item.textContent.substring(0, 100),
    cover_image: item.coverImage,
    author_id: item.authorId.toString(),
    author_name: result.username,
    create_time: item.createTime,
    like_num: item.likeNum,
    view_num: item.viewNum,
  };
};
