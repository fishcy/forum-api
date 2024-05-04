import { countArticlesOfFavorite } from "../services/collectionServices";
import { Favorite } from "../models/favorite";

export const formatFavoriteEntry = async (favorite: Favorite) => {
  const favorite_id = favorite._id.toString();
  const article_num = await countArticlesOfFavorite(favorite_id);
  return {
    favorite_id,
    favorite_name: favorite.favoriteName,
    article_num,
  };
};
