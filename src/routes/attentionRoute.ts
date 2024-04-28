import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";
import {
  cancelFollowUser,
  followUser,
} from "../controllers/attentionController";

const router = new Router({
  prefix: "/api",
});

router.use(authenticateJwt, setResponseBody);

router.post("/follow-user", followUser);
router.post("/cancel-follow-user", cancelFollowUser);

export default router;
