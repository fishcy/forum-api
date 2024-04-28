import Router from "koa-router";
import { setResponseBody } from "../middleware/responseBody";
import {
  getUserCardInfo,
  updateUser,
  userInfo,
} from "../controllers/userController";
import { authenticateJwt } from "../middleware/jwt";

const router = new Router({ prefix: "/api" });

router.use(setResponseBody);
router.get("/get-user-info", userInfo);
router.patch("/update-user-info", authenticateJwt, updateUser);
router.get("/get-user-card-info", getUserCardInfo);

export default router;
