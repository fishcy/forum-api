import Router from "koa-router";
import { login } from "../controllers/userController";
import { setResponseBody } from "../middleware/responseBody";
import { verifySvgCaptcha } from "../middleware/captcha";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.post("/login", verifySvgCaptcha, login);

export default router;
