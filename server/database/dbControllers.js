/* eslint-disable no-param-reassign */
import moment from "moment";
import { database } from "./database";


export default class DbControllers {
  static saveData(data) {
    data.id = DbControllers.generateId();
    data.status = "active";
    database[data.type].push(data);
    return data;
  }

  static saveByKey(data) {
    data.id = DbControllers.generateId();
    data.createdOn = moment().format();
    database[data.key].push(data);
    return data;
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
    database.ACCOUNT.splice(index, 1);
  }
}
