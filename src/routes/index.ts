import Koa from "koa";
import login from "./loginRoute";
import register from "./registerRoute";
import updateThemeColor from "./updateThemeColorRoute";
import article from "./articleRoute";

export const routes = (app: Koa) => {
  app
    .use(login.routes())
    .use(login.allowedMethods())
    .use(register.routes())
    .use(register.allowedMethods())
    .use(updateThemeColor.routes())
    .use(updateThemeColor.allowedMethods())
    .use(article.routes())
    .use(article.allowedMethods());
};
