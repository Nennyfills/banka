
/* eslint-disable radix */
import AllUser from "../database/models/defaultUsers";

class DefaultUserController {
  static login(req, res) {
    const { email, password, id } = req.body;
    AllUser.userLogin({ email, password, id }, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
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
