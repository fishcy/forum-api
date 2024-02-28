import { IMiddleware } from "koa-router";
import { status500 } from "../utils/status";

export const errorHandle: IMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    status500(ctx);
    console.log(err);
  }
};
