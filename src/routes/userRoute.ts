import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import { updateUser, userInfo } from "../controllers/userController";
import { authenticateJwt } from "../middleware/jwt";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody, authenticateJwt);
router.get("/get-user-info", userInfo);
router.patch("/update-user-info", updateUser);

export default router;
