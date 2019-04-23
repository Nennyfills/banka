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
        res.status(400).json({
          status: 400,
          error: err,
          message: "Signup not sucessful",
        });
        return; // stop early
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
          message: "Account not sucessfully created",
          error: err,
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
