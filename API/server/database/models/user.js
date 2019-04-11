import DbControllers from "../dbControllers";


exports.create = (user, cb) => {
  const newuser = DbControllers.saveData(user);
  delete newuser.password;
  cb(null, newuser);
};

exports.createAccount = (data, callbk) => {
  const requiredField = ["firstName", "surName", "type", "accountBalance", "email", "phoneNumber"];
  const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }
  // console.log(data);

  const newAccount = DbControllers.saveByKey(data);
  const balance = newAccount.accountBalance;
  const {
    // eslint-disable-next-line max-len
    createdAt, active, gender, accountBalance, accountId, key, ...editedAccount
  } = newAccount;
  editedAccount.openingBalance = parseFloat(balance);
  callbk(null, editedAccount);
};

exports.findAcount = (data, callbk) => {
  const accounts = DbControllers.getAllAccounts();
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(data, null); return; }

  callbk(null, account);
};

exports.findTransaction = (data, callbk) => {
  const accounts = DbControllers.getAllTransactions();
  const account = accounts.find(acc => acc.accountNumber === data);
  if (!account) { callbk(data, null); return; }

  callbk(null, accounts);
};
