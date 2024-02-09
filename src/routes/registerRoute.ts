import Router from "koa-router";
import { register } from "../controllers/userController";
import { setResponseBody } from "../middleware/responseBody";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.post("/register", register);

export default router;
