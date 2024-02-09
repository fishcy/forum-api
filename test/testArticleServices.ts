import { connect } from "../config/database";

connect().then(async () => {
  const { findArticles } = await import("../src/services/articleServices");
  console.log(await findArticles("测"));
});
