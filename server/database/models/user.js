import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "dotenv";
import databaseController from "../database";
import Validation from "../../middleware/validation";

env.config();


exports.userLogin = async (data, callbck) => {
  try {
    const requiredField = ["email", "password"];
    const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
    if (requiredError.length !== 0) {
      callbck(requiredError, null);
      return;
    }
    const user = await databaseController.findUserByEmail(data.email);
    if (!user) {
      callbck({ message: "User does not exist, Please signup" }, null);
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

exports.createStaffAdmin = async (data, callbk) => {
  try {
    const {
      email, firstName, surname, phonenumber, type,
    } = data;
    const user = await databaseController.findUserByEmail(data.email);
    const permission = "ADMIN" || "STAFF";
    if (permission !== type) { callbk({ messag: "Wrong input, type must be STAFF or ADMIN" }, null); return; }
    if (user) {
      callbk({ message: "email already exist" }, null);
      return;
    }

    const hash = bcrypt.hashSync(data.password, 10);
    const isAdmin = true;
    const password = hash;
    const values = [type, firstName, surname, phonenumber, email, password, isAdmin];
    const newuser = await databaseController.addUser(values);
    callbk(null, { newuser });
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};


exports.createSignup = async (data, callbk) => {
  try {
    const {
      email, firstName, surname, phonenumber,
    } = data;

    const user = await databaseController.findUserByEmail(data.email);
    if (user) {
      callbk({ message: "email already exist" }, null);
      return;
    }
    const hash = bcrypt.hashSync(data.password, 10);
    const isAdmin = false;
    const type = "USER";
    const password = hash;
    const values = [type, firstName, surname, phonenumber, email, password, isAdmin];
    const newuser = await databaseController.addUser(values);
    const token = `Bearer ${jwt.sign(
      {
        payload: {
          type: "USER",
          email,
          isAdmin: false,
          id: newuser.id,
        },
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7h",
      },
    )}`;
    delete newuser.password;

    callbk(null, { token, ...newuser });
    return;
  } catch (err) {
    callbk(err, null);
  }
};

exports.createUserAccount = async (data, callbk) => {
  try {
    const requiredField = ["openingbalance", "email", "type"];
    const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
    if (requiredError.length !== 0) {
      callbk(requiredError, null);
      return;
    }
    const {
      type, email, openingbalance,
    } = data;
    const accountNumber = databaseController.generateAccountNumber();
    const status = "active";
    const permission = "savings" || "current";
    permission.toLowerCase();
    if (permission !== type) { callbk({ messag: "Wrong input, type must be current or savings" }, null); return; }
    const accountDetails = await databaseController.saveAccount({
      accountNumber, email, openingbalance, type, status,
    });
    if (accountDetails.length > 8) {
      callbk({ message: "account not created" }, null);
    }
    delete accountDetails.password;
    callbk(null, accountDetails);
  } catch (err) {
    callbk(err, null);
  }
};

exports.Password = async (data, callbk) => {
  try {
    const requiredField = ["password", "email"];
    const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
    if (requiredError.length !== 0) {
      callbk(requiredError, null);
      return;
    }
    const { password, email } = data;
    const user = await databaseController.findUserByEmail(email);
    if (!user) {
      callbk({ message: "User does not exist, Password can not be changed" }, null);
      return;
    }
    const isValidated = Validation.checkPassword(password);
    if (!isValidated) {
      callbk("Password should be more than 8 character, Include UpperCase letter, Include a number/special charaters.", null); return;
    }
    const hash = bcrypt.hashSync(password, 10);
    const newPassword = hash;
    await databaseController.updatePassword({ newPassword, email });
    callbk(null, "password changed");
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};


exports.UpdateImage = async (data, callbk) => {
  try {
    const { currentUser, imageurl } = data;
    if (!currentUser) { callbk({ message: "Forbidden", err: 403 }, null); return; }
    const user = await databaseController.findUserByEmail(currentUser.email);
    const result = await databaseController.updateImgurl(user.imageurl);
    callbk(null, { data: result });
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};
