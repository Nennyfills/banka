
/* eslint-disable radix */
import AllUser from "../database/models/defaultUsers";

class DefaultUserController {
  static login(req, res) {
    const { email, password } = req.body;
    AllUser.userLogin({ email, password }, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: err,
          message: "Email and password incorrect",
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
}
export default DefaultUserController;
