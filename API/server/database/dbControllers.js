/* eslint-disable no-param-reassign */
import moment from "moment";
import { log } from "util";
import {
  database,
  userdb,
  admindb,
  transactionsdb,
  staff,
  accountdb,
} from "./database";

export default class DbControllers {
  constructor() {
    this.PERMISSION = {
      ADMIN: "ADMIN",
      STAFF: "STAFF",
      USER: "USER",
    };
    this.KEY = {
      DEBIT: "1",
      CEDIT: "2",
      ACOUNT: "3",
      TRANSACTION: "4",
    };
  }

  static saveData(data) {
    data.status = "active";
    data.createdAt = moment().format();
    database[data.type].push(data);
    return data;
  }

  static saveByKey(data) {
    data.createdAt = moment().format();
    database[data.key].push(data);
    return data;
  }

  static getAllUsers() {
    return JSON.parse(JSON.stringify(userdb));
  }

  static getAllAccounts() {
    return JSON.parse(JSON.stringify(accountdb));
  }

  static getAllTransactions() {
    return JSON.parse(JSON.stringify(transactionsdb));
  }

  static generateAccountNumber() {
    this.uniqueNumber = 300;
    this.randomDigit = Math.ceil(Math.random() * 8879789);
    return Number(`${this.uniqueNumber}${this.randomDigit}`);
  }

  static generateId() {
    this.uniqueNumber = 10000;
    this.arrayLength = Math.ceil(Math.random() * 907832789);
    this.id = Number(`${this.uniqueNumber}${this.arrayLength}`);
    return this.id;
  }

  static updataDb(data) {
    const indexOfAccount = database.ACCOUNT.findIndex(acc => acc.id === data.id);

    if (indexOfAccount === -1) { return; }
    database.ACCOUNT[indexOfAccount] = data;
  }
}
