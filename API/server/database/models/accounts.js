import DbControllers from "../dbControllers";


exports.DeleteAccount = (data, callback) => {
  // console.log(data);
  
  const account = DbControllers.getAllAccounts();
  // console.log(account);

  const matchedAccount = account.find(accountData => accountData.accountNumber === parseInt(data.accountnumber, 10));
  // console.log(matchedAccount);
  if (!matchedAccount) { callback(data, null); return; }

  DbControllers.deleteDb(matchedAccount)

  callback(null, "Account deleted");
};
