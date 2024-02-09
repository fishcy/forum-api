import Router from "koa-router";
import { themeColor } from "../controllers/userController";
import { setResponseBody } from "../middleware/responseBody";
import { authenticateJwt } from "../middleware/jwt";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.post("/themeColor", authenticateJwt, themeColor);

export default router;
