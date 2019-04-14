import bcrypt from "bcryptjs";
import env from "dotenv";
import DbControllers from "../dbControllers";
import { database } from "../database";

env.config();

exports.createStaffAdmin = (data, callbk) => {
  const requiredField = ["firstName", "surName", "password", "email", "type"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }
  const users = database.USER;
  const user = users.filter(eachUser => eachUser.email === data.email);
  if (user.length !== 0) {
    callbk("email already exist", null);
    return;
  }

  const hash = bcrypt.hashSync(data.password, 10);
  const isAdmin = true;
  const password = hash;
  const {
    email, firstName, surName, type,
  } = data;
  const allData = {
    isAdmin,
    type,
    password,
    email,
    firstName,
    surName,
  };
  const newuser = DbControllers.saveData(allData);
  // console.log(data.password);

  delete newuser.password;
  callbk(null, newuser);
};

exports.deactivateUser = (data, callbk) => {
  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(`${data} was not found`, null); return; }
  account.status = "Dormant";
  const {
    firstName, id, surName, email, phoneNumber, accountBalance, type, dob, gender, ...newAccount
  } = account;
  DbControllers.updataDb(account);
  callbk(null, newAccount);
};

exports.activateUser = (data, callbk) => {
  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(`${data} was not found`, null); return; }
  account.status = "Active";
  const {
    firstName, id, surName, email, phoneNumber, accountBalance, type, dob, gender, ...newAccount
  } = account;
  DbControllers.updataDb(account);
  callbk(null, newAccount);
};
