import Account from "../database/models/accounts";


class AccountController {
  static delete(req, res) {
    Account.DeleteAccount(req.params, (err, data) => {
      if (err) {
        res.status(404).json({
          status: 404,
          error: err,
          message: "Acount not founded",
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
}

export default AccountController;
