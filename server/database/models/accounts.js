import {
  getAllAccountByAccountNumber, findAccountByEmail, deleteAccount, findAccountByAccountNumber, searchAccountStatus,
} from "../database";


exports.DeleteAccount = async (data, callbck) => {
  const account = await findAccountByAccountNumber(data);
  try {
    if (!account) { callbck(`${data}: not found`, null); return; }
    if (account.status === "active") { callbck(`${data} Active account can't be deleted`); return; }
    const accountNumber = account.accountnumber;
    const deletedAccount = await deleteAccount(accountNumber);
    callbck(null, { deletedAccount, message: "Account deleted" });
  } catch (err) {
    callbck(err.message, null);
  }
};

exports.getAcountByAccountNumber = async (data, callbk) => {
  const account = await findAccountByAccountNumber(data);
  try {
    if (!account) { callbk(`${data} not found`, null); return; }
    callbk(null, account);
  } catch (err) {
    callbk((err.message, null));
  }
};

exports.getAllAccounts = async (data, callbk) => {
  // const
  // const status = await searchAccountStatus()
  const accounts = await getAllAccountByAccountNumber(data);
  try {
    const accountByStatus = accounts.filter(account => account.status === data);
    if (data) {
      callbk(null, accounts);
      return;
    }
    if (accountByStatus.length === 0) { callbk(`${data} not found`); return; }
    callbk(null, accountByStatus);
  } catch (err) {
    callbk(err.message, null);
  }
};

exports.getAcountByEmail = async (data, callbk) => {
  const account = await findAccountByEmail(data);
  try {
    if (account) { callbk(`${data} not found`, null); return; }
    callbk(null, account);
  } catch (err) {
    callbk((err.message, null));
  }
};
