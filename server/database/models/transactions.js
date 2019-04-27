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

exports.findTransactionByDate = async (data, callbk) => {
  try {
    const findByDate = await databaseController.searchTansactionByDate({ from: data.startDate, to: data.endDate });
    if (findByDate.length === 0) { callbk("Nothing found", null); return; }
    callbk(null, findByDate);
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
  }
};
