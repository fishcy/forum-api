import Router from "koa-router";
import { login } from "../controllers/userController";
import { setResponseBody } from "../middleware/responseBody";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.post("/login", login);

export default router;
