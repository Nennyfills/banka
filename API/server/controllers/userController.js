import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../database/models/user";

class UserController {
  static signup(req, res) {
    const {
      email, firstName, surName, password, phoneNumber,
    } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    User.create(
      {
        isAdmin: false,
        type: "USER",
        email,
        firstName,
        surName,
        password: hash,
        phoneNumber,
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
  // static create(res, req) {
  //   const {

  //     transactionsId,
  //     accountNumber,
  //     amount,
  //     casher,
  //     transactionsType,
  //     accountBalance,
}

export default UserController;
