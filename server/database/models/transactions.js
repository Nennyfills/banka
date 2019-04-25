import { findTransactionById, findTransactionByAccountNumber, searchTansactionByDate } from "../database";

exports.findTransactionByAccount = async (data, callbk) => {
  try {
    const transaction = await findTransactionByAccountNumber(data);
    if (transaction.length === 0) { callbk(data, null); return; }
    callbk(null, transaction);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};

exports.findTransactionById = async (data, callbk) => {
  try {
    const transaction = await findTransactionById(data);
    if (transaction.length === 0) { callbk(data, null); return; }
    callbk(null, transaction);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};

exports.findTransactionByDate = async (data, callbk) => {
  try {
    const findByDate = await searchTansactionByDate({ from: data.startDate, to: data.endDate });
    if (findByDate.length === 0) { callbk("Nothing found", null); return; }
    callbk(null, findByDate);
  } catch (err) {
    callbk({ message: err.message }, null);
  }
};
