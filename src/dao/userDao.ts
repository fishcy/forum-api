import { Filter, ObjectId, UpdateFilter } from "mongodb";
import { getDatabase } from "../../config/database";
import { User } from "../models/user";
const database = getDatabase();
const tableName = "users";
const usersCollection = database.collection<User>(tableName);

// 返回对应条件的用户
const findUsers = async (filter: Filter<User>) => {
  let result = await usersCollection.find(filter).toArray();
  return result;
};

// 返回对应条件的用户数量
const getUserCount = async (filter: Filter<User>) => {
  let result = await findUsers(filter);
  return result.length;
};

// 创建一个用户
const createUser = async (doc: User) => {
  return await usersCollection.insertOne(doc);
};

const updateUser = async (_id: ObjectId, update: UpdateFilter<User>) => {
  return await usersCollection.findOneAndUpdate(
    {
      _id,
    },
    update
  );
};

export default {
  findUsers,
  getUserCount,
  createUser,
  updateUser,
};
