import databaseController from "../database";

// exports.findTransactionByAccountnumber = async (accountNumber, callbk) => {
//   // const { accountNumber } = data;
//   try {
//     const transaction = await databaseController.findTransactionByAccountNumber(accountNumber);
//     // if (transaction.length === 0) { callbk(transaction, null); return; }
//     callbk(null, transaction);
//   } catch (err) {
//     callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
//   }
// };

exports.findTransactionByAccountnumber = async ({ accountNumber, startDate, endDate }, callbk) => {
  try {
    const transaction = await databaseController.findTransactionByAccountNumber([accountNumber, startDate, endDate]);
    const eachAcountTransaction = transaction.filter(eachAccount => eachAccount.accountnumber === accountNumber.toString());
    callbk(null, eachAcountTransaction);
    return;
  } catch (err) {
    callbk({ message: err.message.replace(/[^\w|\s]/g, "") }, null);
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
