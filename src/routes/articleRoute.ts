import Router, { IMiddleware } from "koa-router";
import { upload } from "../utils/multer";
import {
  uploadImage,
  uploadArticle,
  showArticle,
  getArticleDetail,
  getUserArticles,
} from "../controllers/articleController";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody);

router.post(
  "/upload-image",
  authenticateJwt,
  upload.single("img") as unknown as IMiddleware<any, {}>,
  uploadImage
);

router.post("/upload-article", authenticateJwt, uploadArticle);

router.get("/recommend", showArticle);

router.get("/article-detail", authenticateJwt, getArticleDetail);

router.get("/own-articles", authenticateJwt, getUserArticles);

export default router;
