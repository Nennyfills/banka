import DbControllers from "../dbControllers";


exports.create = (user, cb) => {
  const newuser = DbControllers.saveData(user);
  delete newuser.password;
  cb(null, newuser);
};

exports.createAccount = (data, callbk) => {
  const newAccount = DbControllers.saveByKey(data);
  console.log(data);
  
  const balance = newAccount.accountBalance;
  console.log(balance);
  
  const {
    // eslint-disable-next-line max-len
    createdAt, active, gender, accountBalance, accountId, key, ...editedAccount
  } = newAccount;
  editedAccount.openingBalance = parseFloat(balance);
  console.log(editedAccount);
  callbk(null, editedAccount);
};
