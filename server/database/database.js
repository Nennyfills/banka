import ptype from "pg-types";
import QUERY from "./queries";
import pool from "./config";

/**
 * @param s — A string to convert into a number.
    @param radix —
 *  @param {Array} values from the query object.
 */
ptype.setTypeParser(1700, val => parseInt(val, 10));

const findEmail = async (email) => {
  const res = await pool.query(QUERY.GET_USER_BY_EMAIL([email]));
  return res.rows[0];
};

class databaseController {
  static async executeQuery(query) {
    await pool.query(query);
  }

  static generateAccountNumber() {
    this.uniqueNumber = 300;
    this.randomDigit = Math.ceil(Math.random() * 8879789);
    return Number(`${this.uniqueNumber}${this.randomDigit}`);
  }

  static async addUser(values) {
    const res = await pool.query(QUERY.ADD_USER(values));
    return res.rows[0];
  }

  static async getImage(imageurl) {
    const res = await pool.query(QUERY.GET_IMAGE([imageurl]));
    return res.rows[0];
  }

  static async findUserByEmail(email) {
    const res = await pool.query(QUERY.GET_USER_BY_EMAIL([email]));
    return res.rows[0];
  }

  static async findAccountByEmail(email) {
    const res = await pool.query(QUERY.GET_ACCOUNT_BY_EMAIL([email]));
    return res.rows;
  }

  static async findUserById(id) {
    const res = await pool.query(QUERY.GET_USER_BY_ID([id]));
    return res.rows[0];
  }

  static async findAccountByOwnerid(values) {
    const res = await pool.query(QUERY.GET_ACCOUNT_BY_OWNERID([values]));
    return res.rows;
  }

  static async findAccountByAccountNumber(accountNumber) {
    const res = await pool.query(QUERY.GET_ACCOUNT_BY_ACCOUNTNUMBER([accountNumber]));
    return res.rows[0];
  }

  static async findTransactionByAccountNumber(values) {
    const res = await pool.query(QUERY.GET_TRANSACTION_BY_ACCOUNTNUMBER(values));
    return res.rows;
  }

  // static async findTransactionByDate(values) {
  //   const res = await pool.query(QUERY.GET_TRANSACTION_BY_DATE(values));
  //   return res.rows;
  // }

  static async findTransactionById(id) {
    const res = await pool.query(QUERY.GET_TRANSACTION_BY_ID([id]));
    return res.rows;
  }

  static async getAllAccountByAccountNumber(values) {
    const res = await pool.query(QUERY.GET_ACCOUNT_BY_ACCOUNTNUMBER([values]));
    return res.rows;
  }

  static async deleteAccount(accountnumber) {
    const res = await pool.query(QUERY.DELETE_ACCOUNT([accountnumber]));
    return res.rows[0];
  }


  static async saveTransaction({
    accountNumber, amount, cashierId, depositor, type, oldBalance, newBalance,
  }) {
    const now = new Date();
    const values = [
      accountNumber, amount, cashierId, depositor,
      type, oldBalance, newBalance, now,
    ];
    const res = await pool.query(QUERY.ADD_TRANSACTION(values));
    return res.rows[0];
  }

  static async updateAccountbalance({ accountNumber, newBalance }) {
    const res = await pool.query(QUERY.UPDATE_ACCOUNTBALANCE([newBalance, accountNumber]));
    return res.rows[0];
  }

  static async updateImgurl({ imageurl, email }) {
    const res = await pool.query(QUERY.UPDATE_IMAGE([imageurl, email]));
    return res.rows[0];
  }

  static async updatePassword({ newPassword, email }) {
    const res = await pool.query(QUERY.UPDATE_PASSWORD([newPassword, email]));
    return res.rows[0];
  }

  static async saveAccount({
    accountNumber, email, openingbalance, type, status,
  }) {
    const currentUser = await findEmail(email);
    const now = new Date();
    const values = [
      currentUser.id, accountNumber, currentUser.email,
      openingbalance, type, status, now,
    ];
    const res = await pool.query(QUERY.ADD_ACCOUNT(values));
    return res.rows[0];
  }

  static async getAllAccount(values) {
    const res = await pool.query(QUERY.GET_ALL_ACCOUNT(values));
    return res.rows;
  }


  static async updateAccountStatus({ accountnumber, status }) {
    const res = await pool.query(QUERY.UPDATE_ACCOUNT_BY_STATUS([status, accountnumber]));
    return res.rows[0];
  }
}

export default databaseController;
