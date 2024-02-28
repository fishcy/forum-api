import { IMiddleware } from "koa-router";

export class ResponseBody {
  msg: string;
  data: Record<string, any>;
  constructor() {
    this.msg = "成功";
    this.data = {};
  }

  setMsg(msg: string) {
    this.msg = msg;
  }

  setDataProperty(key: string, value: any) {
    this.data[key] = value;
  }
}

export const setResponseBody: IMiddleware = async (ctx, next) => {
  ctx.body = new ResponseBody();
  await next();
};
