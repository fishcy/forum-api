import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import path from "path";
import { PORT } from "../config/environment";
import { connect } from "../config/database";
import { errorHandle } from "./middleware/errorHandle";

const app = new Koa({
  proxy: true,
});

connect().then(async () => {
  app.use(errorHandle);
  // 挂载静态资源
  app.use(serve(path.join(__dirname, "../public")));
  app.use(bodyParser());
  const { routes } = await import("./routes");
  routes(app);
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
