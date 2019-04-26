import Account from "../database/models/accounts";


class AccountController {
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

  static accountsByAccountNumber(req, res) {
    const userAccount = Number(req.params.accountnumber);

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

  static accountsByOwnerId(req, res) {
    const userId = Number(req.params.ownerid);
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
