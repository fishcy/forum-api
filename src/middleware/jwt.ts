import { verifyToken } from "../utils/jwt";
import { status401 } from "../utils/status";
import { IMiddleware } from "koa-router";

// 验证
export const authenticateJwt: IMiddleware = async (ctx, next) => {
  const token = ctx.header.authorization;
  if (!token) {
    status401(ctx);
    return;
  }

  try {
    const decoded = verifyToken(token);
    // 将decoded写入ctx.state.payload中，供后续的中间件使用
    ctx.state.payload = decoded;
    await next();
  } catch (err) {
    status401(ctx);
  }
};
