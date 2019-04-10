/* eslint-disable radix */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from "moment";
import User from "../database/models/user";
import DbControllers from "../database/dbControllers";

class UserController {
  static signup(req, res) {
    const {
      email, firstName, surName, password,
    } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    User.create(
      {
        isAdmin: false,
        type: "USER",
        id: DbControllers.generateId(),
        email,
        firstName,
        surName,
        password: hash,
      },
      (err, user) => {
        if (err) {
          res.status(400).json({
            status: 404,
            error: "Signup not sucessful",
          });
          return; // stop early
        }
        const token = jwt.sign(
          {
            type: "USER",
            email,
            isAdmin: false,

          },
          "privatekey",
          {
            expiresIn: "1h",
          },
        );

        // no error was found
        res.status(201).json({
          status: 201,
          user: {
            token,
            message: "User created",
            user,
          },
        });
      },
    );
  }

  static create(req, res) {
    const {
      firstName,
      surName,
      email,
      phoneNumber,
      openingBalance,
      type,
      gender,
      dob,
    } = req.body;
    console.log(email);

    User.createAccount(
      {
        key: "ACCOUNT",
        accountId: DbControllers.generateId(),
        firstName,
        surName,
        accountNumber: DbControllers.generateAccountNumber(),
        email,
        phoneNumber,
        accountBalance: parseFloat(openingBalance),
        type,
        gender,
        dob,
        active: true,
      },
      (err, data) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: "Account not sucessfully created",
          });
        }
        // stop early
        res.status(201).json({
          status: 201,
          message: "Account created",
          data,
        });
      },
    );
  }
}

export default UserController;
