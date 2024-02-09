import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const ASSETS_URL = process.env.ASSETS_URL;
