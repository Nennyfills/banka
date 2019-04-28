import databaseController from "../database";


exports.debitUser = async (data, callbk) => {
  try {
    const {
      amount, accountNumber, cashierId,
    } = data;

    const account = await databaseController.findAccountByAccountNumber(accountNumber);

    if (!cashierId) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (!account) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (account.balance < data.amount) { callbk({ message: "Insufficient Funds", code: 400 }, null); return; }
    if (account.status === "dormant") { callbk({ message: "Account Dormant", code: 400 }, null); return; }

    const type = "debit";
    const depositor = "N/A";
    const oldBalance = account.balance;
    const newBalance = oldBalance - Number(data.amount);
    const updatedAccount = await databaseController.updateAccountbalance({ accountNumber, newBalance });
    const transactionDetail = await databaseController.saveTransaction({
      accountNumber,
      amount: Number(amount),
      cashierId,
      depositor,
      type,
      oldBalance,
      newBalance: updatedAccount.balance,
    });
    delete transactionDetail.depositor;
    callbk(null, transactionDetail);
  } catch (err) {
    callbk({ message: err.message, code: 400 }, null);
  }
};

exports.creditUser = async (data, callbk) => {
  try {
    const requiredField = ["amount", "depositor"];
    const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
    if (requiredError.length !== 0) {
      callbk(requiredError, null);
      return;
    }
    const {
      amount, accountNumber, depositor, cashierId,
    } = data;

    const account = await databaseController.findAccountByAccountNumber(accountNumber);
    if (!depositor) { callbk({ message: "Depositor Required", code: 400 }, null); return; }
    if (!cashierId) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (!account) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (account.status === "dormant") { callbk({ message: "Account Dormant", code: 400 }, null); return; }

    const type = "credit";
    const oldBalance = account.balance;
    const newBalance = oldBalance + Number(data.amount);
    const updatedAccount = await databaseController.updateAccountbalance({ accountNumber, newBalance });
    const transactionDetail = await databaseController.saveTransaction({
      accountNumber,
      amount: Number(amount),
      cashierId,
      depositor,
      type,
      oldBalance,
      newBalance: updatedAccount.balance,
    });
    callbk(null, transactionDetail);
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, ""), code: 400 }, null);
  }
};


exports.DeleteAccount = async (data, callbck) => {
  try {
    const account = await databaseController.findAccountByAccountNumber(data);
    if (!account) { callbck({ message: "Account not find", code: 404 }, null); return; }
    if (account.status === "active") { callbck({ message: "Active account can't be deleted", code: 400 }, null); return; }
    const accountNumber = account.accountnumber;
    const deletedAccount = await databaseController.deleteAccount(accountNumber);
    callbck(null, { deletedAccount });
  } catch (err) {
    callbck({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};


exports.getAcountByAccountNumber = async (data, callbk) => {
  try {
    const account = await databaseController.findAccountByAccountNumber(data);
    if (!account) { callbk({ message: "Account not find" }, null); return; }
    callbk(null, account);
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};


exports.getAllAccountsByOwnerid = async (data, callbk) => {
  try {
    const { currentUser } = data.req;
    const result = await databaseController.findUserById(currentUser.id);
    const accounts = await databaseController.findAccountByOwnerid(data.userId);
    const account = accounts.find(value => value.ownerid === data.userId);
    if (!account) { callbk({ message: "No account found" }, null); return; }
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
  try {
    const { currentUser } = data.req;
    const result = await databaseController.findUserById(currentUser.id);
    const accounts = await databaseController.findAccountByEmail(data.useEmail);
    const account = accounts.find(value => value.ownerid === data.userId);
    if (result.isadmin || result.id === account.ownerid) {
      callbk(null, accounts);
      return;
    }
    callbk({ message: "Forbidden", code: 403 }, null);
    return;
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};

exports.toggleAccountStatus = async (data, callbk) => {
  const account = await databaseController.findAccountByAccountNumber(data);

  try {
    if (!account) { callbk({ message: "Account not found", code: 404 }, null); return; }

    const status = account.status === "active" ? "dormant" : "active";
    const { accountnumber } = account;

    const update = await databaseController.updateAccountStatus({ status, accountnumber });
    callbk(null, { update });
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};
