import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "dotenv";
import { database } from "../database";

env.config();
exports.userLogin = (data, callbck) => {
  const requiredField = ["email", "password"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbck(requiredError, null);
    return;
  }
  
  const alluser = database.USER;
  const allAdmin = database.ADMIN;
  const allStaff = database.STAFF;

  const users = alluser.find(user => user.email !== data.email);
  const admin = allAdmin.find(user => user.email === data.email);
  const staff = allStaff.find(user => user.email === data.email);
  const currentUsers = users || admin || staff;
  
  if (!currentUsers) {
    callbck("Auth Fail email", null);
    return;
}
  bcrypt.compare(data.password, currentUsers.password, (err, res) => {
    if (!res) {
      return callbck("Invalid email and password", null);
    }
    const token = jwt.sign(
      {
        email: currentUsers.email,
        userId: currentUsers.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );
    callbck(null, token);
  });
};