import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { createSvgCaptcha } from "../middleware/captcha";

const router = new Router({
  prefix: "/api",
});

router.use(setResponseBody);

router.get("/get-captcha", createSvgCaptcha);

export default router;
