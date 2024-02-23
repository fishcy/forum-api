import { InsertOneResult, Document, ObjectId } from "mongodb";
import userDao from "../dao/userDao";
import { User } from "../models/user";

// 检查用户是否存在，存在返回true，不存在返回false
export const checkUserExist = async (
  _id?: ObjectId,
  email?: string,
  phone?: string,
): Promise<boolean> => {
  return !!(await userDao.getUserCount({
    $or: [{ _id }, { email }, { phone }],
  }));
};

export const findUser = async (
  _id?: ObjectId,
  email?: string,
  phone?: string
) => {
  return (
    await userDao.findUsers({
      $or: [{ _id }, { email }, { phone }],
    })
  )[0];
};

export const createUser = async (
  email: string,
  phone: string,
  password: string
): Promise<InsertOneResult<Document>> => {
  return await userDao.createUser(new User(email, phone, password));
};

export const updateThemeColor = async (_id: ObjectId, themeColor: string) => {
  return await userDao.updateUser(_id, {
    $set: {
      themeColor,
    },
  });
};
