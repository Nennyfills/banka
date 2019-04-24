import {
  getAllAccount, findAccountByEmail,
  deleteAccount, findAccountByAccountNumber,
  searchAccountStatus, searchAccountByDate, findAccountByOwnerid,
} from "../database";


exports.DeleteAccount = async (data, callbck) => {
  const account = await findAccountByAccountNumber(data);
  try {
    if (!account) { callbck({ message: "Account not find", code: 404 }, null); return; }
    if (account.status === "active") { callbck({ message: "Active account can't be deleted", code: 400 }, null); return; }
    const accountNumber = account.accountnumber;
    const deletedAccount = await deleteAccount(accountNumber);
    callbck(null, { deletedAccount });
  } catch (err) {
    callbck({ message: err.message }, null);
  }
};

exports.getAcountByAccountNumber = async (data, callbk) => {
  const account = await findAccountByAccountNumber(data);
  try {
    if (!account) { callbk({ message: "Account not find" }, null); return; }
    callbk(null, account);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};

exports.getAllAccountsByOwnerid = async (data, callbk) => {
  try {
    const result = await findAccountByOwnerid(data);

    if (result.length === 0) {
      callbk({ message: "No account found" }, null);
      return;
    }
    callbk(null, result);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};

exports.getAllAccounts = async (data, callbk) => {
  try {
    // let result = null;
    // if (data.startDate && data.endDate) {
      // result = await searchAccountByDate({ from: data.startDate, to: data.startDate });
    // } else {
     const result = await getAllAccount();
    // }
    // if (data.startDate && data.endDate && data.status)
    //   const accountStatus = await searchAccountStatus(data.status);
    // if (result.length === 0) {
    //   callbk("No account found", null);
    //   return;
    // }
    // callbk(null, accounts);
    // if (accountStatus.length === 0) { callbk("No account found", null); return; }
    // callbk(null, accountStatus);
    // if (findByDate.length === 0) { callbk("No account found", null); return; }

    callbk(null, result);
  } catch (err) {
    callbk(err, null);
  }
};

exports.getAcountByEmail = async (data, callbk) => {
  const account = await findAccountByEmail(data);
  try {
    if (account) { callbk({ message: "Account not found", code: 404 }, null); return; }
    callbk(null, account);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};
