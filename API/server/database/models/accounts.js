import DbControllers from "../dbControllers";


exports.DeleteAccount = (data, callback) => {
 
  const account = DbControllers.getAllAccounts();

  const matchedAccount = account.find(accountData => accountData.accountNumber === Number(data));
  if (!matchedAccount) { callback(data, null); return; }

  DbControllers.deleteDb(matchedAccount);

  callback(null, "Account deleted");
};

exports.getEachAcount = (data, callbk) => {
  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(data, null); return; }

  callbk(null, account);
};
