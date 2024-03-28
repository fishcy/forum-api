import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";
import {
  deleteReply,
  getReplys,
  uploadReply,
} from "../controllers/replyController";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody).use(authenticateJwt);

router.post("/publish-reply", uploadReply);
router.get("/get-replys", getReplys);
router.patch("/delete-reply", deleteReply);

export default router;
