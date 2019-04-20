import { database } from "../database";

exports.findTransactionByAccount = (data, callbk) => {
  const accounts = database.TRANSACTION;
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(data, null); return; }

  callbk(null, accounts);
};

exports.findTransactionById = (data, callbk) => {
  const accounts = database.TRANSACTION;
  const account = accounts.find(acc => acc.id === data);
  (account);
  if (!account) { callbk(`${data} invalid id`, null); return; }

  callbk(null, account);
};
