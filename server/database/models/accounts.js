import databaseController from "../database";

exports.DeleteAccount = async (data, callbck) => {
  try {
        const account = await databaseController.findAccountByAccountNumber(data);
    if (!account) { callbck({ message: "Account not find", code: 404 }, null); return; }
    if (account.status === "active") { callbck({ message: "Active account can't be deleted", code: 400 }, null); return; }
    const accountNumber = account.accountnumber;
    const deletedAccount = await databaseController.deleteAccount(accountNumber);
    callbck(null, { deletedAccount });
  } catch (err) {
    callbck({ message: err.message }, null);
  }
};

exports.getAcountByAccountNumber = async (data, callbk) => {
  try {
    const account = await databaseController.findAccountByAccountNumber(data);
    if (!account) { callbk({ message: "Account not find" }, null); return; }
    callbk(null, account);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};

exports.getAllAccountsByOwnerid = async (data, callbk) => {
  try {
    const { currentUser } = data.req;
    const result = await databaseController.findUserById(currentUser.id);
    const accounts = await databaseController.findAccountByOwnerid(data.userId);
    const account = accounts.find(value => value.ownerid === data.userId);
    if (result.isadmin || result.id === account.ownerid) {
      callbk(null, accounts);
      return;
    }
    callbk({ message: "Forbidden", code: 403 }, null);
    return;
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};


exports.getAllAccounts = async ({ startDate, endDate, status }, callbk) => {
  try {
    const account = await databaseController.getAllAccount([startDate, endDate, status]);
    callbk(null, account);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};

exports.getAcountByEmail = async (data, callbk) => {
  const account = await databaseController.findAccountByEmail(data);
  try {
    if (!account) { callbk({ message: "Account not found" }, null); return; }
    callbk(null, account);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};
