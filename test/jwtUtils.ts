import { generateToken, verifyToken } from "../src/utils/jwt";

const token = generateToken({ a: "1" })
console.log(token);
setTimeout(() => {
  console.log(verifyToken(token));
}, 2000);
