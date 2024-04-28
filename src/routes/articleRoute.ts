import Router, { IMiddleware } from "koa-router";
import { upload } from "../utils/multer";
import {
  uploadImage,
  uploadArticle,
  showArticle,
  getArticleDetail,
  getUserArticles,
  deleteArticle,
} from "../controllers/articleController";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";
import { pushArticleNotification } from "../middleware/notification";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody);

router.post(
  "/upload-image",
  authenticateJwt,
  upload.single("img") as unknown as IMiddleware,
  uploadImage
);

router.post("/upload-article", authenticateJwt, uploadArticle, pushArticleNotification);

router.get("/recommend", showArticle);

router.get("/article-detail", authenticateJwt, getArticleDetail);

router.get("/own-articles", authenticateJwt, getUserArticles);

router.patch("/delete-article", authenticateJwt, deleteArticle);

export default router;
