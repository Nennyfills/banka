/* eslint-disable radix */
import User from "../database/models/user";

class UserController {
  static signup(req, res) {
    const {
      email, firstName, surName, password,
    } = req.body;
    User.create({
      email,
      firstName,
      surName,
      password,
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
        message: "User created",
        data,
      });
    });
  }

  static createUserAccount(req, res) {
    const {
      firstName,
      surName,
      openingBalance,
      phoneNumber,
      type,
    } = req.body;

    const { email } = req.currentUser;
    User.createUserAccount({
      firstName,
      surName,
      openingBalance,
      phoneNumber,
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
