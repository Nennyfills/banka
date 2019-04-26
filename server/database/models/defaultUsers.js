import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "dotenv";
import databaseController from "../database";
env.config();
exports.userLogin = async (data, callbck) => {
  try {
    const user = await databaseController.findUserByEmail(data.email);
    if (!user) {
      callbck({ message: "User do not exist, Please signup" }, null);
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
    callbck({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};
