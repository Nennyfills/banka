/* eslint-disable radix */
import Transaction from "../database/models/transactions";


/**
 * @params {obj}
 */

class TransactionsController {
  static transactionByAccount(req, res) {
    const accountNumber = Number(req.params.accountnumber);
    Transaction.findTransactionByAccount(accountNumber, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          message: err.message,
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
        res.status(404).json({
          status: 404,
          message: err.message,
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

  static viewAccountDate(req, res) {
    const { startDate, endDate } = req.query;
    Transaction.findTransactionByDate({ startDate, endDate }, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          message: err.message,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "Request was successfully",
        data,
      });
    });
  }
}

export default TransactionsController;
