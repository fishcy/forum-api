import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { userInfo } from "../controllers/userController";
import { authenticateJwt } from "../middleware/jwt";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.get("/get-user-info", authenticateJwt, userInfo);

export default router;
