/* eslint-disable no-param-reassign */
import moment from "moment";
import {
  database,
  userdb,
  admindb,
  staff,
  accountdb,
  transactionsId,
} from "./database";
import { log } from "util";

export default class dbControllers {
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
    data.id = Math.floor(Math.random() * 598) + 509;
    data.createdAt = moment().format();
    console.log(data);
    database[data.type].push(data);
    return data;
    // console.log(database, this.data.type);
  }

  static getAllUsers() {
    return JSON.stringify(userdb);
  }

  static getAllAccounts() {
    return JSON.stringify(accountdb);
  }

  static getAllTransactions() {
    return JSON.stringify(transactionsId);
  }

  static generateAccountNumber() {
    this.uniqueNumber = "300";
    this.randomDigit = Math.floor(Math.random() * 806598) + 806509;
    return `${this.uniqueNumber} ${this.randomDigit}`;
  }

  static generateId(data) {
    this.uniqueNumber = "100000";
    this.arrayLength = database[data.type].length + 1;
    this.id = `${this.uniqueNumber}${this.arrayLength}`;
    return this.id;
  }
}
