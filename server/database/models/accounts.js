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
  console.log(data, "data");
  
  const accounts = database.ACCOUNT;
  console.log(accounts);
  
  const account = accounts.find(acc => acc.accountNumber === data);
  console.log(account,"before not");
  
  if (!account) { callbk(`${data} not found`, null); return; }
  console.log(account, "after not");
  

  callbk(null, account);
};
