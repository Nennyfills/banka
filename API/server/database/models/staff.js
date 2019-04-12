import DbControllers from "../dbControllers";

exports.debitUser = (data, callbk) => {
  const requiredField = ["cashier", "amount", "type", "accountNumber"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }
  const accounts = DbControllers.getAllAccounts();
  console.log(data.accountNumber);
  const account = accounts.find(acc => acc.accountNumber === parseFloat(data.accountNumber));
  if (!account) { callbk(data, null); return; }
  const oldBalance = account.accountBalance;
  if (oldBalance < data.amount) { callbk("insufficient balance", null); return; }
    const currentBalance = Number(oldBalance) - Number(data.amount);

  account.accountBalance = currentBalance;
  DbControllers.updataDb(account);
  console.log(account);
    console.log(oldBalance);
    console.log(currentBalance);
    
    
  
  const transaction = {
    key: "TRANSACTION",
    oldBalance,
    currentBalance,
    ...data,
  };
  DbControllers.saveByKey(transaction);
  delete transaction.key;
  callbk(null, transaction);
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
  const transaction = {
    key: "TRANSACTION",
    oldBalance,
    newBalance,
    ...data,
  };
  DbControllers.saveByKey(transaction);
  delete transaction.key;
  callbk(null, transaction);
};
