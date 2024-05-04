import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";
import { getChatRecord } from "../controllers/privateMessageController";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody, authenticateJwt);

router.get("/get-chat-record", getChatRecord);

export default router;
