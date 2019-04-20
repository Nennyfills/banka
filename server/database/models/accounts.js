import { database } from "../database";
import DbControllers from "../dbControllers";

exports.DeleteAccount = (data, callback) => {
  const accounts = database.ACCOUNT;

  const matchedAccount = accounts.find(accountData => accountData.accountNumber === Number(data));
  // console.log(matchedAccount);

  if (!matchedAccount) { callback(`${data}: not found`, null); return; }

  DbControllers.deleteDb(matchedAccount);

  callback(null, "Account deleted");
};

exports.getAcountByAccountNumber = (data, callbk) => {
  const accounts = database.ACCOUNT;
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(`${data} not found`, null); return; }

  callbk(null, account);
};

exports.getAllAccounts = (data, callbk) => {
  const allAccount = database.ACCOUNT;
  const accountByStatus = allAccount.filter(account => account.status === data);
  if (!data) {
    callbk(null, allAccount);
    return;
  }
  if (accountByStatus.length === 0) { callbk(`${data} not found`); return; }
  callbk(null, accountByStatus);
};

exports.getAcountByEmail = (data, callbk) => {
  const accounts = database.ACCOUNT;
  const account = accounts.filter(acc => acc.email === data);
  if (!account) { callbk(`${data} not found`, null); return; }
  if (account.length === 0) { callbk(`${data} not found`); return; }
  callbk(null, account);
  account;
};
