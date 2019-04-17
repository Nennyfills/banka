import { database } from "../database";
import DbControllers from "../dbControllers";


exports.DeleteAccount = (data, callback) => {
  const accounts = database.ACCOUNT;

  const matchedAccount = accounts.find(accountData => accountData.accountNumber === Number(data));
  if (!matchedAccount) { callback(`${data}: not found`, null); return; }

  DbControllers.deleteDb(matchedAccount);

  callback(null, "Account deleted");
};

exports.getEachAcount = (data, callbk) => {

  const accounts = database.ACCOUNT;
  
  const account = accounts.find(acc => acc.accountNumber === data);
  
  if (!account) { callbk(`${data} not found`, null); return; }
  
  callbk(null, account);
};
