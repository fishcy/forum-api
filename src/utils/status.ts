import { RouterContext } from "koa-router";

export const status200 = (ctx: RouterContext) => {
  ctx.status = 200;
  ctx.body = "Ok";
};

// 未授权
export const status401 = (ctx: RouterContext) => {
  ctx.status = 401;
  ctx.body = "Unauthorized";
};

export const status500 = (ctx: RouterContext) => {
  ctx.status = 500;
  ctx.body = "Internal Server Error";
};
