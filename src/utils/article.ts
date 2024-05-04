import {
  findThumbsUpNotCancel,
  findThumbsUpByItemId,
} from "../services/thumbsUpServices";
import { Article } from "../models/article";
import { findUser } from "../services/userServices";
import {
  findCollectionByArticleId,
  isCollected,
} from "../services/collectionServices";

export const formatArticle = async (article: Article, userId: string) => {
  const author_name = (await findUser(article.authorId)).username;
  const like_num = (await findThumbsUpByItemId(article._id.toString())).length;
  const is_like = (await findThumbsUpNotCancel(article._id.toString(), userId))
    .length;
  return {
    article_id: article._id.toString(),
    title: article.title,
    brief_content: article.textContent.substring(0, 100),
    cover_image: article.coverImage,
    author_id: article.authorId.toString(),
    author_name,
    create_time: article.createTime,
    like_num,
    view_num: article.viewNum,
    is_like,
  };
};

export const formatArticleDetail = async (article: Article, userId: string) => {
  const article_id = article._id.toString();
  const author_name = (await findUser(article.authorId)).username;
  const like_num = (await findThumbsUpByItemId(article_id)).length;
  const is_like = (await findThumbsUpNotCancel(article_id, userId)).length;
  const collect_num = (await findCollectionByArticleId(article_id)).filter(
    (item) => {
      return !item.isCancel;
    }
  ).length;
  const is_collected = await isCollected(article_id, userId);
  return {
    author_id: article.authorId.toString(),
    author_name,
    article_id,
    title: article.title,
    text_content: article.textContent,
    html_content: article.htmlContent,
    create_time: article.createTime,
    like_num,
    view_num: article.viewNum,
    is_like,
    collect_num,
    is_collected,
  };
};

export const formatArticleNotification = async (article: Article) => {
  return {
    article_id: article._id.toString(),
    title: article.title,
    brief_content: article.textContent.substring(0, 100),
    cover_image: article.coverImage,
  };
};
