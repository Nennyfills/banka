import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import DbControllers from "../dbControllers";
import databaseController from "../database";

exports.create = async (data, callbk) => {
  try {
    const requiredField = ["firstName", "surname", "password", "email", "phonenumber"];
    const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
    if (requiredError.length !== 0) {
      callbk({ message: requiredError }, null);
      return;
    }
    const user = await databaseController.findUserByEmail(data.email);
    if (user) {
      callbk({ message: "email already exist" }, null);

      return;
    }
    const hash = bcrypt.hashSync(data.password, 10);
    const isAdmin = false;
    const type = "USER";
    const password = hash;
    const {
      email, firstName, surname, phonenumber,
    } = data;

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
    callbk(null, { token, ...newuser });
  } catch (err) {
    callbk(err, null);
  }
};

exports.createUserAccount = async (data, callbk) => {
  try {
    const requiredField = ["openingbalance", "type", "email"];
    const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
    if (requiredError.length !== 0) {
      callbk({ message: requiredError }, null);

      return;
    }
    const accountNumber = DbControllers.generateAccountNumber();
    const status = "active";
    const {
      type, email, openingbalance,
    } = data;
    const accountDetails = await databaseController.saveAccount({
      accountNumber, email, openingbalance, type, status,
    });
    if (accountDetails.length > 8) {
      callbk({ message: "account not created" }, null);
    }
    callbk(null, accountDetails);
  } catch (err) {
    console.log(err);
    callbk(err, null);
  }
};
