import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "dotenv";
import DbControllers from "../dbControllers";
import { database } from "../database";

env.config();

exports.create = (data, callbk) => {
  const requiredField = ["firstName", "surName", "password", "email"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }

  const users = database.USER;
  const user = users.filter(eachUser => eachUser.email === data.email);
  // console.log("phpne", user);
  if (user.length !== 0) {
    callbk("email already exist", null);
    return;
  }

  const hash = bcrypt.hashSync(data.password, 10);
  const isAdmin = false;
  const type = "USER";
  const password = hash;
  const { email, firstName, surName } = data;
  const token = jwt.sign(
    {
      type: "USER",
      email,
      isAdmin: false,

    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  const allData = {
    token,
    isAdmin,
    type,
    password,
    email,
    firstName,
    surName,
  };
  const newuser = DbControllers.saveData(allData);
  delete newuser.password;
  callbk(null, newuser);
};

exports.createUser = (data, callbk) => {
  const requiredField = ["firstName", "surName", "openingBalance", "type", "email"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }
  const users = database.USER;
  const currentUser = users.find(eachUser => eachUser.email === data.email);

  const key = "ACCOUNT";
  const ownerId = currentUser.id;
  const accountNumber = DbControllers.generateAccountNumber();
  const balance = data.openingBalance;
  const status = "Active";
  const {
    type, email, firstName, surName, openingBalance,
  } = data;
  const allData = {
    key,
    firstName,
    surName,
    ownerId,
    accountNumber,
    status,
    balance,
    type,
    email,
  };
  let newAccount = DbControllers.saveByKey(allData);
  delete newAccount.key; delete newAccount.balance;
  newAccount = { openingBalance, ...newAccount };
  callbk(null, newAccount);
};


exports.findTransaction = (data, callbk) => {
  const accounts = database.TRANSACTION;
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(data, null); return; }

  callbk(null, accounts);
};
