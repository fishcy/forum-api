import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { getChatList, uploadChat } from "../controllers/chatController";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody);

router.get("/chat-with-user", uploadChat);
router.get("/get-chat-list", getChatList);

export default router;
