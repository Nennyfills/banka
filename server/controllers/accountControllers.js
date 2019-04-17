import Account from "../database/models/accounts";
import { database } from "../database/database";


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

  static accountprofile(req, res) {
    const userAccount = Number(req.params.accountnumber);
    console.log(userAccount, "control");
    Account.getEachAcount(userAccount, (err, data) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: "Invalid account",
          error: err,
        });
        return;
      }
      console.log(err);

      // stop early
      res.status(200).json({
        status: 200,
        message: "Request was successfully",
        data,
      });
    });
  }

  static accounts(req, res) {
    const accounts = database.ACCOUNT;
    res.status(200).json({
      status: 200,
      message: "Request was successfully",
      accounts,
    });
  }
}

export default AccountController;
