
/* eslint-disable radix */
import AllUser from "../database/models/defaultusers";

class DefaultUserController {
  static login(req, res) {
    const { email, password } = req.body;
    AllUser.userLogin({ email, password }, (err, data) => {
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
}
export default DefaultUserController;
