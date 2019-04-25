import bcrypt from "bcryptjs";
import env from "dotenv";
import databaseController from "../database";
import Validate from "../../helpers/validation";

env.config();

exports.createStaffAdmin = async (data, callbk) => {
  try {
    const requiredField = ["firstName", "surname", "password", "phonenumber", "email", "type"];
    const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
    if (requiredError.length !== 0) {
      callbk({ message: requiredError }, null);
      return;
    }
    const {
      email, firstName, surname, phonenumber, type,
    } = data;
    const isEmail = Validate.isEmail(data.email);
    if (!isEmail) { callbk({ message: "Email not valid " }, null); return; }
    const isName = Validate.isName({ firstName, surname, type });
    if (!isName) { callbk({ message: " Firstname, surname or type must be a valid" }, null); return; }
    console.log(isName, "ggn");
    const isPhoneNumber = Validate.isPhoneNumber({ phonenumber });
    if (!isPhoneNumber) { callbk({ message: "Not a valid phone number" }, null); return; }
    console.log(isPhoneNumber);
    
    // if (isPhoneNumber) { callbk({ message: " Phone not valid " }, null); return; }
    const user = await databaseController.findUserByEmail(data.email);

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

exports.toggleAccountStatus = async (data, callbk) => {
  const account = await databaseController.findAccountByAccountNumber(data);

  try {
    if (!account) { callbk({ message: "Account not found", code: 404 }, null); return; }

    const status = account.status === "active" ? "dormant" : "active";
    const { accountnumber } = account;

    const update = await databaseController.updateAccountStatus({ status, accountnumber });
    callbk(null, { update });
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};
