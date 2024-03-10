import { IMiddleware } from "koa-router";
import { status429 } from "../utils/status";
import svgCaptcha from "svg-captcha";
import { ResponseBody } from "./responseBody";
import { verifyToken } from "../utils/jwt";
import { captchaCookieName } from "../middleware/cookie";

// 设置过期时间为1分钟
const EXPIRE_TIME = 5 * 60 * 1000;

// 请求限制时间
const LIMIT_TIME = 1000;

let userCaptcha: Record<string, { time: number; captchaText: string }> = {};

export const createSvgCaptcha: IMiddleware = async (ctx, next) => {
  const currentTime = Date.now();
  // 清除过期的验证码
  for (const key in userCaptcha) {
    if (currentTime - userCaptcha[key].time >= EXPIRE_TIME)
      delete userCaptcha[key];
  }
  const cookieVal = ctx.state.cookieVal;

  // 如果记录存在且未超过请求限制时间，则表示请求过于频繁
  if (
    userCaptcha[cookieVal] &&
    currentTime - userCaptcha[cookieVal].time < LIMIT_TIME
  ) {
    status429(ctx);
    return;
  }
  const captcha = svgCaptcha.create({
    noise: 3,
    width: 100,
    height: 40,
  });
  userCaptcha[cookieVal] = {
    time: currentTime,
    captchaText: captcha.text.toLowerCase(),
  };
  const responseBody = ctx.body as ResponseBody;
  responseBody.setDataProperty("svg-captcha", captcha.data);
  await next();
};

export const verifySvgCaptcha: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  // 登录时，有token不需要验证码
  const { authorization } = ctx.request.header;
  if (authorization) {
    try {
      // 验证token是否正确
      // token正确则进入下一个中间件
      verifyToken(authorization);
      await next();
    } catch (err) {
      responseBody.setMsg("请求错误");
    } finally {
      return;
    }
  }
  const { captcha } = ctx.request.body as Record<string, any>;
  const cookieVal = ctx.cookies.get(captchaCookieName);
  const currentTime = Date.now();
  if (
    currentTime - userCaptcha[cookieVal].time > EXPIRE_TIME ||
    userCaptcha[cookieVal].captchaText !== captcha.toLowerCase()
  ) {
    responseBody.setMsg("验证码失效或不正确");
    return;
  }
  await next();
};
