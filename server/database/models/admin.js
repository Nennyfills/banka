import bcrypt from "bcryptjs";
import env from "dotenv";
import { database } from "../database";
import DbControllers from "../dbControllers";

env.config();

exports.createStaffAdmin = (data, callbk) => {
  const requiredField = ["firstName", "surName", "password", "email", "type"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }
  const admins = database.ADMIN;
  const staffs = database.STAFF;
  const admin = admins.filter(eachUser => eachUser.email === data.email);
  const staff = staffs.filter(eachUser => eachUser.email === data.email);
  if (staff.length !== 0 || admin.length !== 0) {
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

  delete newuser.password;
  delete newuser.type;
  // console.log(newuser)
  callbk(null, newuser);
};

exports.toggleAccountStatus = (data, callbk) => {
  const accounts = database.ACCOUNT;
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(`${data} was not found`, null); return; }

  account.status = account.status === "active" ? "dormant" : "active";
  const {
    accountNumber, status,
  } = account;
  DbControllers.updataDb(account);
  callbk(null, { accountNumber, status });
};
