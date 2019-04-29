/* eslint-disable radix */
import User from "../database/models/user";

class UserController {
  /**
  *
  * @param {bject} req email, firstName, surname, password, phonenumber, type, from the body for user signup;
  * @param {bject} res reponspond with an error message on failure exstatus code or return data on success;
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
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
      return res.status(201).json({
        status: 201,
        message: "account created",
        data,
      });
    });
  }


  /**
*
* @param {bject} req email, type, openingbalance from the body for ctreating bank account;
* @param {bject} res reponspond with an error message on failure exstatus code or return data on success;
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
        return res.status(400).json({
          status: 400,
          message: err,
        });
      }
      return res.status(201).json({
        status: 201,
        message: "Account created",
        data,
      });
    });
  }


  /**
*
* @param {bject} req email, firstName, surname, password, phonenumber, type, from the body for ctreating admin account;
* @param {bject} res reponspond with an error message on failure exstatus code or return data on success;
*/


  static createStaffAdminAccount(req, res) {
    const {
      email, firstName, surname, password, phonenumber, type,
    } = req.body;
    type.toUpperCase();
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
          message: "Bad request",
        });
        return;
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

    User.userLogin({ email, password }, (err, { token, user }) => {
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
        token,
        user,
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


  /**
*
* @param {object} req to get the current user;
* @param {object} res reponspond with an error message on failure or return data on success;

*/

  static getProfileImage(req, res) {
    User.GetImage(req, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: err,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "Request successful",
        data: data.data,
      });
    });
  }

  /**
*
* @param {object} req imageurl to update the user and req to get the current user;
* @param {object} res reponspond with an error message on failure or return data on success;

*/

  static UpdateProfileImage(req, res) {
    const { imageurl } = req.body;
    User.UpdateImage({ req, imageurl }, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: err,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "Request successful",
        data: data.data,
      });
    });
  }
}

export default UserController;
