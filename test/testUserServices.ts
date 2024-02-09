import { connect } from "../config/database";

connect().then(async () => {
  const { checkUserExist } = await import("../src/services/userServices");

  checkUserExist().then((res: boolean) => {
    console.log("无参数", res);
  });

  checkUserExist(undefined, "chuyuzhong1@gmail.com").then((res) => {
    console.log(res);
  });
});
