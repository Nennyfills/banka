import DbControllers from "../dbControllers";


exports.DeleteAccount = (data, callback) => {
  const account = DbControllers.mainAccountDatabase();
    console.log(account);
    
    const matchedAccount = account.find(accountData => accountData.accountNumber === parseInt(data.usersAccount, 10));
    console.log(matchedAccount);
    if (!matchedId) { callback(data, null); return; }

    const index = account.indexOf(matchedId);

    account.splice(index, 1);

  callback(null, "Account deleted");
};
