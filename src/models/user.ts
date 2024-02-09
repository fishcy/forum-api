import { ASSETS_URL } from "../../config/environment";
import { ObjectId } from "mongodb";

export class User {
  _id!: ObjectId;
  email: string;
  phone: string;
  passoword: string;
  username: string;
  avatar: string;
  themeColor: string;
  constructor(email: string, phone: string, password: string) {
    this.email = email;
    this.phone = phone;
    this.passoword = password;
    this.username = String(Date.now());
    this.avatar = `${ASSETS_URL}/avatar.png`;
    this.themeColor = "#333333";
  }
}
