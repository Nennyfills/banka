
/* eslint-disable radix */
import Staff from "../database/models/staff";

class StaffController {
  static debit(req, res) {
    const { amount, depositor } = req.body;
    const cashierId = req.currentUser.id;
    const accountNumber = Number(req.params.accountnumber);
    Staff.debitUser({
      amount, cashierId, accountNumber, depositor,
    }, (err, data) => {
      if (err) {
        res.status(err.code).json({
          status: err.code,
          error: err,
          message: err.message,
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
    const { amount, depositor } = req.body;
    const cashierId = req.currentUser.id;
    const accountNumber = Number(req.params.accountnumber);
    Staff.creditUser({
      amount, cashierId, accountNumber, depositor,
    }, (error, data) => {
      if (error) {
        res.status(error.code).json({
          status: error.code,
          error,
          message: error.message,
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
