import DbControllers from "../dbControllers";


exports.DeleteAccount = (data, callback) => {
  
  const accounts = DbControllers.getAllAccounts();

  const matchedAccount = accounts.find(accountData => accountData.accountNumber === Number(data));
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
