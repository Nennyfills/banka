
/* eslint-disable radix */
import Staff from "../database/models/staff";

class StaffController {
  static debit(req, res) {
    const data = req.body;
    data.cashierEmail = req.currentUser.email

    Staff.debitUser(data, (err, data) => {
      if (err) {
        return res.status(err.code).json({
          status: err.code,
          error: err,
          message: err.message,
        });
      }
      res.status(200).json({
        status: 200,
        message: "Debit successful",
        data,
      });
    });
  }

  static credit(req, res) {
    const data = req.body;    
    data.cashierEmail = req.currentUser.email
    Staff.creditUser(data, (err, data) => {

      if (err) {
        return res.status(err.code).json({
          status: err.code,
          error: err,
          message: err.message,
        });
        
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
