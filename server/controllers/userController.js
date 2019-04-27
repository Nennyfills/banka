/* eslint-disable radix */
import User from "../database/models/user";

class UserController {
  /**
*
* @param {*} req
* @param {*} res
*/
  static signup(req, res) {
    const {
      email, firstName, surname, password, phonenumber,
    } = req.body;
    User.createSignup({
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

  /**
   *
   * @param {*} req
   * @param {*} res
   */

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


  /**
*
* @param {*} req
* @param {*} res
*/


  static createStaffAdminAccount(req, res) {
    const {
      email, firstName, surname, password, phonenumber, type,
    } = req.body;
    // type.toUpperCase();
    User.createStaffAdmin({
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
          message: err.message,
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

  /**
*
*@param {object} req email and password from the body to check if user exist;
* @param {object} res reponspond with an error message on failure exstatus code or return data on success;
*/

  static login(req, res) {
    const { email, password } = req.body;
    User.userLogin({ email, password }, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "Login successful",
        token: data,
      });
    });
  }

  /**
*
* @param {object} req email and password from the body to check user;
* @param {object} res reponspond with an error message on failure or return data on success;

*/

  static resetPassword(req, res) {
    const { email, password } = req.body;
    User.Password({ email, password }, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: err,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "Password successfully changed",
        data,
      });
    });
  }
}

export default UserController;
