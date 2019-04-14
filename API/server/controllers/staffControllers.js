
/* eslint-disable radix */
import Staff from "../database/models/staff";

class StaffController {
  static debit(req, res) {
    Staff.debitUser(req.body, (err, data) => {
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
        message: "Debit successful",
        data,
      });
    });
  }

  static credit(req, res) {
    Staff.creditUser(req.body, (err, data) => {
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
        message: "Credit successful",
        data,
      });
    });
  }
}
export default StaffController;
