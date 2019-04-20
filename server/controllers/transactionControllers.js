/* eslint-disable radix */
import Transaction from "../database/models/transactions";


/**
 * @params {obj}
 */

class TransactionsController {
  static transactionByAccount(req, res) {
    const userAccount = parseInt(req.params.accountnumber);
    Transaction.findTransactionByAccount(userAccount, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: "Invalid account",
          error: err,
        });
        return;
      }
      // stop early
      res.status(200).json({
        status: 200,
        message: "Request was successfully",
        data,
      });
    });
  }

  static transactionById(req, res) {
    const transactionId = parseInt(req.params.transactionId);
    Transaction.findTransactionById(transactionId, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: "Invalid id",
          error: err,
        });
        return;
      }
      // stop early
      res.status(200).json({
        status: 200,
        message: "Request was successfully",
        data,
      });
    });
  }
}

export default TransactionsController;
