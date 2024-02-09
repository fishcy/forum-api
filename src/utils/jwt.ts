import jwt from "jsonwebtoken";

const secretKey = "ZmlzaGN5X2Jsb2c=";
const expiresIn = 60 * 60 * 24 * 15; //15天

type payload = {
  _id: string;
};

// 根据有效载荷，生成jwt
export const generateToken = function (payload: string | object | Buffer) {
  return jwt.sign(payload, secretKey, {
    expiresIn,
  });
};

// 验证token
export const verifyToken = function (token: string): payload {
  return jwt.verify(token, secretKey) as payload;
};
