import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { createSvgCaptcha } from "../middleware/captcha";
import { captchaCookieInterceptor } from "../middleware/cookie";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody);

router.get("/get-captcha", captchaCookieInterceptor, createSvgCaptcha);

export default router;
