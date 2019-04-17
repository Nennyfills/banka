import { database } from "../database";
import DbControllers from "../dbControllers";

exports.debitUser = (data, callbk) => {
  const requiredField = ["amount", "accountNumber", "cashierEmail"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk({ message: requiredError, code: 400 }, null);
    return;
  }

  const { amount, accountNumber } = data;
  const cashier = database.STAFF.filter(staff => staff.email === data.cashierEmail).id;
  const accounts = database.ACCOUNT;
  const account = accounts.find(acc => acc.accountNumber === parseFloat(data.accountNumber));

  if (!account) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
  if (account.accountBalance < data.amount) { callbk({ message: "Insufficient Funds", code: 400 }, null); }

  const oldBalance = account.accountBalance;
  const newBalance = oldBalance - Number(data.amount);
  account.accountBalance = newBalance;
  DbControllers.updataDb(account);

  const key = "TRANSACTION";
  const transaction = {
    key,
    amount,
    type: "debit",
    accountNumber,
    oldBalance,
    newBalance,
    cashier,
  };

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
  const requiredField = ["amount", "accountNumber", "cashierEmail"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk({ message: requiredError, code: 400 }, null);
    return;
  }

  const { amount, accountNumber } = data;
  const cashier = database.STAFF.filter(staff => staff.email === data.cashierEmail).id;

  const accounts = database.ACCOUNT;

  const account = accounts.find(acc => acc.accountNumber === accountNumber);

  if (!account) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
  
  const oldBalance = account.accountBalance;
  const newBalance = oldBalance + Number(data.amount);
  account.accountBalance = newBalance;
  DbControllers.updataDb(account);

  const key = "TRANSACTION";
  const transaction = {
    key,
    amount,
    type: "credit",
    accountNumber,
    oldBalance,
    newBalance,
    cashier,
  };

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
