import DbControllers from "../dbControllers";

exports.debitUser = (data, callbk) => {
  const requiredField = ["cashier", "amount", "type", "accountNumber"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }

  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === parseFloat(data.accountNumber));
  console.log(account, "here");

  if (!account) { callbk(data, null); return; }

  const newBalance = account.accountBalance - parseInt(data.amount);
  account.accountBalance = newBalance;
  DbControllers.updataDb(account);

  const transaction = data;
  transaction.key = "TRANSACTION";
  DbControllers.saveByKey(transaction);

  const response = {
    transactionId: transaction.id,
    accountNumber: transaction.accountNumber,
    amount: transaction.amount,
    cashier: transaction.cashier,
    transactionType: transaction.type,
    accountBalance: newBalance,
  };


  callbk(null, response);
};


exports.creditUser = (data, callbk) => {
  const requiredField = ["cashier", "amount", "type", "accountNumber"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }
  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === parseFloat(data.accountNumber));

  if (!account) { callbk(data, null); return; }
  const oldBalance = account.accountBalance;
  const newBalance = oldBalance + parseInt(data.amount);
  account.accountBalance = newBalance;
  DbControllers.updataDb(account);

  const transaction = data;
  transaction.key = "TRANSACTION";
  DbControllers.saveByKey(transaction);

  const response = {
    transactionId: transaction.id,
    accountNumber: transaction.accountNumber,
    amount: transaction.amount,
    cashier: transaction.cashier,
    transactionType: transaction.type,
    accountBalance: newBalance,
  };


  callbk(null, response);
};
