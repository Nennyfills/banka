/* eslint-disable radix */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../database/models/admin";
import DbControllers from "../database/dbControllers";

class AdminController {
  static create(req, res) {
    const {
      email, firstName, surName, password,
    } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    Admin.create(
      {
        isAdmin: true,
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

        // no error was found
        res.status(201).json({
          status: 201,
          user: {
            message: "Staff created",
            user,
          },
        });
      },
    );
  }



  static activate(req, res) {
    const userAccountNumber = parseInt(req.params.accountnumber);
    Admin.activateUser(userAccountNumber, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          error: err,
          message: "Acount not founded",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "successfully deactivate",
        data,
      });
    });
  }

  static deactivate(req, res) {
    const userAccountNumber = parseInt(req.params.accountnumber);
    Admin.deactivateUser(userAccountNumber, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          error: err,
          message: "Acount not founded",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "successfully deactivate",
        data,
      });
    });
  }
}

export default AdminController;
