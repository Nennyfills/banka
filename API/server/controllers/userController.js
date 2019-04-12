/* eslint-disable radix */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "dotenv"
import User from "../database/models/user";
import DbControllers from "../database/dbControllers";
env.config();
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
          process.env.SECRET_KEY,
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
    User.createAccount(
      {
        key: "ACCOUNT",
        firstName,
        surName,
        accountNumber: DbControllers.generateAccountNumber(),
        email,
        phoneNumber,
        accountBalance: parseFloat(openingBalance),
        type,
        gender,
        dob,
      },
      (err, data) => {
        if (err) {
          res.status(400).json({
            status: 400,
            message: "Account  not sucessfully created",
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
      },
    );
  }

  static profile(req, res) {
    const userAccount = parseInt(req.params.accountnumber);

    User.findAcount(userAccount, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: "Invalid account",
          error: err,
        });
        return;
      }
      // stop early
      res.status(200).json({
        status: 200,
        message: "Request was successfully",
        data,
      });
    });
  }

  static transaction(req, res) {
    const userAccount = parseInt(req.params.accountNumber);
    console.log(userAccount);

    User.findTransaction(userAccount, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: "Invalid account",
          error: err,
        });
        return;
      }
      // stop early
      res.status(200).json({
        status: 200,
        message: "Request was successfully",
        data,
      });
    });
  }
}

export default UserController;
