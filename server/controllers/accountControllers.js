import Account from "../database/models/accounts";


class AccountController {
/**
 * @param {bject} req.params get accountnumber from params and cashierId from currentUser;
* @param {bject} req.body get amount from req.body to debit a client
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/
  static debit(req, res) {
    const { amount } = req.body;
    const cashierId = req.currentUser.id;
    const accountNumber = Number(req.params.accountnumber);
    Account.debitUser({
      amount, cashierId, accountNumber,
    }, (err, data) => {
      if (err) {
        res.status(err.code).json({
          status: err.code,
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


  /**
 * @param {bject} req.params get accountnumber from params, cashierId from currentUser;
* @param {bject} req.body get amount and depositor  from req.body to credit a client
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/


  static credit(req, res) {
    const { amount, depositor } = req.body;
    const cashierId = req.currentUser.id;
    const accountNumber = Number(req.params.accountnumber);
    Account.creditUser({
      amount, cashierId, accountNumber, depositor,
    }, (error, data) => {
      if (error) {
        res.status(400).json({
          status: 400,
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

  /**
*
* @param {bject} req.params get accountnumber from params and return all deleted account;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/


  static delete(req, res) {
    Account.DeleteAccount(Number(req.params.accountnumber), (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          message: err.message,
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "Delete successful",
        data,
      });
    });
  }


  /**
*
* @param {bject} req.params get accountnumber from params and return all specific account;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/


  static accountsByAccountNumber(req, res) {
    const userAccount = parseInt(req.params.accountnumber);

    Account.getAcountByAccountNumber(userAccount, (err, data) => {
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
* @param {object} req.query get all accounts, get account by status, startDate, endDate, from req.query;
* @param {object} res reponspond with an error message on failure status code or return data on success;
*/

  static viewAllAccount(req, res) {
    const { status, startDate, endDate } = req.query;

    Account.getAllAccounts({ status, startDate, endDate }, (err, data) => {
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
* @param {bject} req.params get all accounts by ower id;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/
  static accountsByOwnerId(req, res) {
    const userId = parseInt(req.params.ownerId, 10);
    Account.getAllAccountsByOwnerid({ userId, req }, (err, data) => {
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
* @param {bject} req.params active and deactive all specific accounts by account number;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/

  static toggleAccountStatus(req, res) {
    const accountNumber = Number(req.params.accountnumber);
    Account.toggleAccountStatus(accountNumber, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          message: err.message,
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "successfully",
        data,
      });
    });
  }

  /**
*
* @param {bject} req.params get specific account by email;
* @param {bject} res reponspond with an error message on failure status code or return data on success;
*/


  static accountsByEmail(req, res) {
    const useEmail = req.params.email;
    Account.getAcountByEmail({ useEmail, req }, (err, data) => {
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

export default AccountController;
