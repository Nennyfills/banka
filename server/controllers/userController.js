/* eslint-disable radix */
import User from "../database/models/user";

class UserController {
  static signup(req, res) {
    const {
      email, firstName, surname, password, phonenumber,
    } = req.body;
    User.create({
      email,
      firstName,
      surname,
      password,
      phonenumber,
    }, (err, data) => {
      if (err) {
        res.status(409).json({
          status: 409,
          message: err.message,
        });
        return;
      }
      res.status(201).json({
        status: 201,
        message: "account created",
        data,
      });
    });
  }

  static createUserAccount(req, res) {
    const {
      openingbalance,
      type,
    } = req.body;

    const { email } = req.currentUser;
    User.createUserAccount({
      openingbalance,
      type,
      email,
    }, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
        return;
      }
      // stop early
      res.status(201).json({
        status: 201,
        message: "Account created",
        data,
      });
    });
  }
}

export default UserController;
