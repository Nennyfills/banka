import {
  updateAccountbalance, saveTransaction, findAccountByAccountNumber,
} from "../database";


exports.debitUser = async (data, callbk) => {
  const requiredField = ["amount", "accountNumber", "depositor"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk({ message: requiredError, code: 400 }, null);
    return;
  }
  const {
    amount, accountNumber, depositor, cashierId,
  } = data;

  try {
    const account = await findAccountByAccountNumber(accountNumber);

    if (!cashierId) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (!account) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (account.balance < data.amount) { callbk({ message: "Insufficient Funds", code: 400 }, null); return; }
    if (account.status === "dormant") { callbk({ message: "Account Dormant", code: 400 }, null); return; }

    const type = "debit";
    const oldBalance = account.balance;
    const newBalance = oldBalance - Number(data.amount);
    const updatedAccount = await updateAccountbalance({ accountNumber, newBalance });
    const transactionDetail = await saveTransaction({
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
    callbk({ message: err.message, code: 400 }, null);
  }
};

exports.creditUser = async (data, callbk) => {
  const requiredField = ["amount", "accountNumber", "depositor"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk({ message: requiredError, code: 400 }, null);
    return;
  }
  const {
    amount, accountNumber, depositor, cashierId,
  } = data;

  try {
    const account = await findAccountByAccountNumber(accountNumber);
    console.log(account);
    
    if (!cashierId) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (!account) { callbk({ message: "Account Not Found", code: 404 }, null); return; }
    if (account.status === "dormant") { callbk({ message: "Account Dormant", code: 400 }, null); return;}

    const type = "credit";
    const oldBalance = account.balance;
    const newBalance = oldBalance + Number(data.amount);
    const updatedAccount = await updateAccountbalance({ accountNumber, newBalance });
    const transactionDetail = await saveTransaction({
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
    callbk({ message: err.message, code: 400 }, null);
  }
};
