import databaseController from "../database";

exports.findTransactionByAccount = async (data, callbk) => {
  try {
    const transaction = await databaseController.findTransactionByAccountNumber(data.accountNumber);
    if (transaction.length === 0) { callbk(data, null); return; }
    callbk(null, transaction);
  } catch (err) {
    callbk({ message: err }, null);
  }
};

exports.findTransactionById = async (data, callbk) => {
  try {
    const transaction = await databaseController.findTransactionById(data.transactionId);
    callbk(null, transaction);
    return;
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};

exports.viewAllTransaction = async ({ startDate, endDate }, callbk) => {
  try {
    const transaction = await databaseController.getAllTansaction([startDate, endDate]);
    callbk(null, transaction);
    return;
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};
