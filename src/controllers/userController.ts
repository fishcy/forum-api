import { IMiddleware } from "koa-router";
import {
  checkUserExist,
  createUser,
  findUser,
  updateThemeColor,
} from "../services/userServices";
import { generateToken, verifyToken } from "../utils/jwt";
import { ResponseBody } from "../middleware/responseBody";
import { ObjectId } from "mongodb";

type Body = {
  email?: string;
  phone?: string;
  password?: string;
};

export const register: IMiddleware = async (ctx, next) => {
  const { email = "", phone = "", password = "" } = ctx.request.body as Body;
  const responseBody = ctx.body as ResponseBody;
  // 校验
  if (!email || !phone || !password) {
    responseBody.setMsg("注册失败，输入不能为空！");
    return;
  }
  // 检查用户是否存在
  const isExisted = await checkUserExist(undefined, email, phone);
  if (isExisted) {
    responseBody.setMsg("用户已存在");
    return;
  } else {
    // 创建用户
    const { insertedId } = await createUser(email, phone, password);
    const token = generateToken({
      _id: insertedId.toString(),
    });
    const { _id, username, avatar, themeColor } = await findUser(insertedId);
    // 设置token
    ctx.response.set("Authorization", token);
    responseBody.setDataProperty("user_id", _id.toString());
    responseBody.setDataProperty("username", username);
    responseBody.setDataProperty("avatar", avatar);
    responseBody.setDataProperty("themeColor", themeColor);
    await next();
  }
};

export const login: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { authorization } = ctx.request.header;
  let user;
  let token;
  // 有token
  if (authorization) {
    try {
      const result = verifyToken(authorization) as Record<string, any>;
      token = authorization;
      user = await findUser(new ObjectId(result._id));
    } catch (err) {
      // token出错或过期
      responseBody.setMsg("出错或过期");
      return;
    }
  } else {
    let isExisted = false;
    const { email, phone, password } = ctx.request.body as Body;
    isExisted = await checkUserExist(undefined, email, phone);
    // 找到用户了
    if (isExisted) {
      user = await findUser(undefined, email, phone);
      if (user.passoword !== password) {
        responseBody.setMsg("账号或密码错误");
        return;
      }
      token = generateToken({ _id: user._id.toString() });
    } else {
      responseBody.setMsg("账号或密码错误");
      return;
    }
  }
  await next();
  const { _id, username, avatar, themeColor } = user;
  ctx.response.set("authorization", token);
  responseBody.setDataProperty("user_id", _id.toString());
  responseBody.setDataProperty("username", username);
  responseBody.setDataProperty("avatar", avatar);
  responseBody.setDataProperty("themeColor", themeColor);
};

export const themeColor: IMiddleware = async (ctx, next) => {
  const { themeColor } = ctx.request.body as Record<string, any>;
  const userId = ctx.state.payload._id;
  await updateThemeColor(new ObjectId(userId), themeColor as string);
  await next();
};

export const userInfo: IMiddleware = async (ctx, next) => {
  const responseBody = ctx.body as ResponseBody;
  const { user_id } = ctx.request.query;
  const result = await findUser(new ObjectId(user_id as string));
  if (result) {
    responseBody.setDataProperty("username", result.username);
    responseBody.setDataProperty("avatar", result.avatar);
    await next();
  } else {
    responseBody.setMsg("用户不存在");
  }
};
