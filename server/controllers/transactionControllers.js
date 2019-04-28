/* eslint-disable radix */
import Transaction from "../database/models/transactions";


/**
*
* @param {bject} req.params get accountnumber from req.params to get all transaction on one account;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/

class TransactionsController {
  static transactionByAccount(req, res) {
    const accountNumber = Number(req.params.accountnumber);
    Transaction.findTransactionByAccount({ accountNumber, req }, (err, data) => {
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

  /**
*
* @param {bject} req.params get transaction Id from req.params to get specify transaction by id;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/

  static transactionById(req, res) {
    const transactionId = parseInt(req.params.transactionId);
    Transaction.findTransactionById({ transactionId, req }, (err, data) => {
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

  /**
*
* @param {bject} req.query get startDate, endDate, from req.query to aid serach transaction by date;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/

  static viewTransactionByDate(req, res) {
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
