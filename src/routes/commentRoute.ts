import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";
import { uploadComment, getComments } from "../controllers/commentController";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody).use(authenticateJwt);

router.post("/publish-comment", uploadComment);
router.get("/get-comments", getComments);

export default router;
