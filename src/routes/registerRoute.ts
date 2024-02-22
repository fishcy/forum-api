import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { verifySvgCaptcha } from "../middleware/captcha";
import { register } from "../controllers/userController";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.post("/register", verifySvgCaptcha, register);

export default router;
