import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";
import { thumbsUp, cancelThumbsUp } from "../controllers/thumbsUpController";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.post("/thumbs-up", authenticateJwt, thumbsUp);
router.post("/cancel-thumbs-up", authenticateJwt, cancelThumbsUp);

export default router;
