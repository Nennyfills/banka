import Account from "../database/models/accounts";


class AccountController {
  static delete(req, res) {
    Account.DeleteAccount(req.params.accountnumber, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          error: err,
          message: "Acount not found",
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

  static viewAllAccount(req, res) {
    const { status } = req.query;
    Account.getAllAccounts(status, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: "Invalid account",
          error: err,
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

    Account.getAcountByEmail(useEmail, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: "account not found",
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
      //   (data);
    });
  }
}

export default AccountController;
