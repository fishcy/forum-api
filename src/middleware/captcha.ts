import { IMiddleware } from "koa-router";
import { status429 } from "../utils/status";
import svgCaptcha from "svg-captcha";
import { ResponseBody } from "./responseBody";

// 设置过期时间为1分钟
const EXPIRE_TIME = 5 * 60 * 1000;

// 请求限制时间
const LIMIT_TIME = 1000;

let userCaptcha: Record<string, { time: number; captchaText: string }> = {};

export const createSvgCaptcha: IMiddleware<any, {}> = async (ctx, next) => {
  console.log(ctx.request.ip);
  const currentTime = Date.now();
  // 清除过期的验证码
  for (const key in userCaptcha) {
    if (currentTime - userCaptcha[key].time >= EXPIRE_TIME)
      delete userCaptcha[key];
  }
  const ip = ctx.request.ip;

  // 如果记录存在且未超过请求限制时间，则表示请求过于频繁
  if (userCaptcha[ip] && currentTime - userCaptcha[ip].time < LIMIT_TIME) {
    status429(ctx);
    return;
  }
  const captcha = svgCaptcha.create({
    noise: 3,
    width: 100,
    height: 40,
  });
  userCaptcha[ip] = {
    time: currentTime,
    captchaText: captcha.text.toLowerCase(),
  };
  const responseBody = ctx.body as ResponseBody;
  responseBody.setDataProperty("svg-captcha", captcha.data);
  await next();
};

export const verifySvgCaptcha: IMiddleware<any, {}> = async (ctx, next) => {
  const { captcha } = ctx.request.body as Record<string, any>;
  const ip = ctx.request.ip;
  const currentTime = Date.now();
  console.log(userCaptcha[ip]);
  console.log(captcha);
  if (
    currentTime - userCaptcha[ip].time > EXPIRE_TIME ||
    userCaptcha[ip].captchaText !== captcha.toLowerCase()
  ) {
    const responseBody = ctx.body as ResponseBody;
    responseBody.setMsg("验证码失效或不正确");
    return;
  }
  await next();
};
