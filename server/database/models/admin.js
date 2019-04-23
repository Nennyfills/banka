import bcrypt from "bcryptjs";
import env from "dotenv";
import {
  addUser, findUserByEmail, updateAccountStatus, findAccountByAccountNumber,
} from "../database";


env.config();

exports.createStaffAdmin = async (data, callbk) => {
  const requiredField = ["firstName", "surname", "password", "phonenumber", "email", "type"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }
  try {
    const user = await findUserByEmail(data.email);

    if (user) {
      callbk("email already exist", null);
      return;
    }

    const hash = bcrypt.hashSync(data.password, 10);
    const isAdmin = true;
    const password = hash;
    const {
      email, firstName, surname, phonenumber, type,
    } = data;
    const values = [type, firstName, surname, phonenumber, email, password, isAdmin];
    const newuser = await addUser(values);
    callbk(null, { newuser });
  } catch (err) {
    callbk(err.detail, null);
  }
};

exports.toggleAccountStatus = async (data, callbk) => {
  const account = await findAccountByAccountNumber(data);

  try {
    if (!account) { callbk(`${data} was not found`, null); return; }

    const status = account.status === "active" ? "dormant" : "active";
    const { accountnumber } = account;

    const update = await updateAccountStatus({ accountnumber, status });
    callbk(null, { update });
  } catch (err) {
    callbk(err.message, null);
  }
};
