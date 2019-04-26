import databaseController from "../database";

exports.findTransactionByAccount = async (data, callbk) => {
  try {
    const transaction = await databaseController.findTransactionByAccountNumber(data);
    if (transaction.length === 0) { callbk(data, null); return; }
    callbk(null, transaction);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};

exports.findTransactionById = async (data, callbk) => {
  try {
    const { currentUser } = data.req;
    const result = await databaseController.findUserById(currentUser.id);
    const transactions = await databaseController.findTransactionById(data.accountNumber);
    // const accounts = await databaseController.findAccountByOwnerid(data.userId);
    const transaction = transactions.find(value => value.accountNumber === data.accountNumber);
    if (result.isadmin || result.id === transaction.accountNumber) {
      callbk(null, transaction);
      return;
    }
    callbk({ message: "Forbidden", code: 403 }, null);
    return;
    // if (transaction.length === 0) { callbk(data, null); return; }
    // callbk(null, transaction);
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};

exports.findTransactionByDate = async (data, callbk) => {
  try {
    const findByDate = await databaseController.searchTansactionByDate({ from: data.startDate, to: data.endDate });
    if (findByDate.length === 0) { callbk("Nothing found", null); return; }
    callbk(null, findByDate);
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};
