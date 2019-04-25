import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "dotenv";
import { findUserByEmail } from "../database";

env.config();
exports.userLogin = async (data, callbck) => {
  const requiredField = ["email", "password"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbck({ requiredError }, null);
    return;
  }
  try {
    const user = await findUserByEmail(data.email);
    if (!user) {
      callbck("Auth Fail email", null);
      return;
    }
    bcrypt.compare(data.password, user.password, (err, res) => {
      if (!res) {
        return callbck({ message: "Invalid email and password" }, null);
      }      
      const token = `Bearer ${jwt.sign(
        {
          email: user.email,
          permission: user.permission,
          id: user.id,
          isAdmin: user.isadmin,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "7d",
        },
      )}`;
      callbck(null, token);
    });
    
  } catch (err) {
    callbck({ message: err.message }, null);
  }
};
