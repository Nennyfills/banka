import Account from "../database/models/accounts";


class AccountController {
  /**
*
* @param {*} req
* @param {*} res
*/
  static debit(req, res) {
    const { amount } = req.body;
    const cashierId = req.currentUser.id;
    const accountNumber = Number(req.params.accountnumber);
    Account.debitUser({
      amount, cashierId, accountNumber,
    }, (err, data) => {
      if (err) {
        console.log(err);
        
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
*
* @param {*} req
* @param {*} res
*/


  static credit(req, res) {
    const { amount, depositor } = req.body;
    const cashierId = req.currentUser.id;
    const accountNumber = Number(req.params.accountnumber);
    Account.creditUser({
      amount, cashierId, accountNumber, depositor,
    }, (error, data) => {
      if (error) {
        res.status(error.code).json({
          status: error.code,
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
* @param {*} req
* @param {*} res
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
* @param {*} req
* @param {*} res
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
* @param {*} req
* @param {*} res
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
* @param {*} req
* @param {*} res
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
* @param {*} req
* @param {*} res
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
* @param {*} req
* @param {*} res
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
