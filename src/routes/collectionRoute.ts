import Router from "koa-router";
import {
  cancelArticleCollection,
  collectArticle,
  getCollection,
} from "../controllers/collectionController";
import { authenticateJwt } from "../middleware/jwt";
import { setResponseBody } from "../middleware/responseBody";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody, authenticateJwt);

router.get("/get-collections", getCollection);

router.post("/collect-article", collectArticle);

router.post("/cancel-article-collection", cancelArticleCollection);

export default router;
