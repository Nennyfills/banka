
/* eslint-disable radix */
import Staff from "../database/models/staff";

class StaffController {
  static debit(req, res) {
    const { amount } = req.body;
    const cashierEmail = req.currentUser.email;
    const accountNumber = Number(req.params.accountnumber);
    Staff.debitUser({ amount, cashierEmail, accountNumber }, (err, data) => {
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
    const { amount } = req.body;
    const cashierEmail = req.currentUser.email;
    const accountNumber = Number(req.params.accountnumber);
    Staff.creditUser({ amount, cashierEmail, accountNumber }, (err, data) => {
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
        message: "Credit successful",
        data,
      });
    });
  }
}
export default StaffController;
