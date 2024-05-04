import Router from "koa-router";
import { authenticateJwt } from "../middleware/jwt";
import { setResponseBody } from "../middleware/responseBody";
import {
  checkUserCollectArticle,
  createFavorite,
  deleteFavorite,
  getFavorite,
  getFavoriteDetails,
  updateFavorite,
} from "../controllers/favoriteController";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody);

router.get("/get-favorite", getFavorite);

router.get("/get-favorite-details", getFavoriteDetails);

router.get(
  "/check-user-collect-article",
  authenticateJwt,
  checkUserCollectArticle
);

router.post("/create-favorite", authenticateJwt, createFavorite);

router.post("/update-favorite", authenticateJwt, updateFavorite);

router.post("/delete-favorite", authenticateJwt, deleteFavorite);

export default router;
