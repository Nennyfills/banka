/* eslint-disable no-param-reassign */
import moment from "moment";
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
    data.id = DbControllers.generateId();
    data.status = "active";
    database[data.type].push(data);
    return data;
  }

  static saveByKey(data) {
    data.id = DbControllers.generateId();
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

  static getAllAdmin() {
    return JSON.parse(JSON.stringify(admindb));
  }

  static getAllStaff() {
    return JSON.parse(JSON.stringify(staff));
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

  static deleteDb(data) {
    const index = database.ACCOUNT.indexOf(data);
    console.log(index);

    database.ACCOUNT.splice(index, 1);
    // return data;
    console.log(database.ACCOUNT);
  }
}
