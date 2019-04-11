import DbControllers from "../dbControllers";

exports.deactivateUser = (data, callbk) => {
  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(`${data} was not found`, null); return; }
  account.status = "Dormant";
  const {
    firstName, id, surName, email, phoneNumber, accountBalance, type, dob, gender, ...newAccount
  } = account;
  DbControllers.updataDb(account);
  callbk(null, newAccount);
};

exports.activateUser = (data, callbk) => {
  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(`${data} was not found`, null); return; }
  account.status = "Active";
  const {
    firstName, id, surName, email, phoneNumber, accountBalance, type, dob, gender, ...newAccount
  } = account;
  DbControllers.updataDb(account);
  callbk(null, newAccount);
};
