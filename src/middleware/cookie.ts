import { randomUUID } from "crypto";
import { IMiddleware } from "koa-router";

export const captchaCookieName = "CAPTCHA_COOKIE";

export const captchaCookieInterceptor: IMiddleware = async (ctx, next) => {
  const captchaCookie = ctx.cookies.get(captchaCookieName);
  if (!captchaCookie) {
    const cookieVal = randomUUID();
    ctx.state.cookieVal = cookieVal;
    ctx.cookies.set(captchaCookieName, cookieVal, {
      sameSite: "strict",
    });
  }
  await next();
};
