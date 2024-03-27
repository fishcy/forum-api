import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";
import {
  uploadComment,
  getComments,
  deleteComment,
} from "../controllers/commentController";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody).use(authenticateJwt);

router.post("/publish-comment", uploadComment);
router.get("/get-comments", getComments);
router.patch("/delete-comment", deleteComment);

export default router;
