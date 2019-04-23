/* eslint-disable radix */
import Admin from "../database/models/admin";

class AdminController {
  static createStaffAdminAccount(req, res) {
    const {
      email, firstName, surname, password, phonenumber, type,
    } = req.body;


    Admin.createStaffAdmin({
      email,
      firstName,
      surname,
      password,
      phonenumber,
      type,
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

  static toggleAccountStatus(req, res) {
    const accountNumber = Number(req.params.accountnumber);
    Admin.toggleAccountStatus(accountNumber, (err, data) => {
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
        message: "successfully",
        data,
      });
    });
  }
}

export default AdminController;
