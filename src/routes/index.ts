import Koa from "koa";
import login from "./loginRoute";
import register from "./registerRoute";
import updateThemeColor from "./updateThemeColorRoute";
import article from "./articleRoute";
import captcha from "./captchaRoute";
import userInfo from "./userRoute";
import thumbsUp from "./thumbsUpRoute";
import comment from "./commentRoute";
import reply from "./replyRoute";
import chat from "./chatRoute";
import privateMessage from "./privateMessageRoute";
import attention from "./attentionRoute";

export const routes = (app: Koa) => {
  app
    .use(login.routes())
    .use(login.allowedMethods())
    .use(register.routes())
    .use(register.allowedMethods())
    .use(updateThemeColor.routes())
    .use(updateThemeColor.allowedMethods())
    .use(article.routes())
    .use(article.allowedMethods())
    .use(captcha.routes())
    .use(captcha.allowedMethods())
    .use(userInfo.routes())
    .use(userInfo.allowedMethods())
    .use(thumbsUp.routes())
    .use(thumbsUp.allowedMethods())
    .use(comment.routes())
    .use(comment.allowedMethods())
    .use(reply.routes())
    .use(reply.allowedMethods())
    .use(chat.routes())
    .use(chat.allowedMethods())
    .use(privateMessage.routes())
    .use(privateMessage.allowedMethods())
    .use(attention.routes())
    .use(attention.allowedMethods());
};
