import { findTransactionById, findTransactionByAccountNumber } from "../database";

exports.findTransactionByAccount = async (data, callbk) => {
  try {
    const transaction = await findTransactionByAccountNumber(data);
    if (transaction.length === 0) { callbk(data, null); return; }
    callbk(null, transaction);
  } catch (err) {
    callbk(err.message, null);
  }
};

exports.findTransactionById = async (data, callbk) => {
  try {
    const transaction = await findTransactionById(data);
    if (transaction.length === 0) { callbk(data, null); return; }
    callbk(null, transaction);
  } catch (err) {
    callbk(err.message, null);
  }
};
