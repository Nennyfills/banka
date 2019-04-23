"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _database = require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DbControllers =
/*#__PURE__*/
function () {
  function DbControllers() {
    _classCallCheck(this, DbControllers);
  }

  _createClass(DbControllers, null, [{
    key: "saveData",
    value: function saveData(data) {
      data.id = DbControllers.generateId();
      data.status = "active";

      _database.database[data.type].push(data);

      return data;
    }
  }, {
    key: "saveByKey",
    value: function saveByKey(data) {
      data.id = DbControllers.generateId();
      data.createdOn = (0, _moment["default"])().format();

      _database.database[data.key].push(data);

      return data;
    }
  }, {
    key: "generateAccountNumber",
    value: function generateAccountNumber() {
      this.uniqueNumber = 300;
      this.randomDigit = Math.ceil(Math.random() * 8879789);
      return Number("".concat(this.uniqueNumber).concat(this.randomDigit));
    }
  }, {
    key: "generateId",
    value: function generateId() {
      this.uniqueNumber = 10000;
      this.arrayLength = Math.ceil(Math.random() * 907832789);
      this.id = Number("".concat(this.uniqueNumber).concat(this.arrayLength));
      return this.id;
    }
  }, {
    key: "updataDb",
    value: function updataDb(data) {
      var indexOfAccount = _database.database.ACCOUNT.findIndex(function (acc) {
        return acc.id === data.id;
      });

      if (indexOfAccount === -1) {
        return;
      }

      _database.database.ACCOUNT[indexOfAccount] = data;
    }
  }, {
    key: "deleteDb",
    value: function deleteDb(data) {
      var index = _database.database.ACCOUNT.indexOf(data);

      _database.database.ACCOUNT.splice(index, 1);
    }
  }]);

  return DbControllers;
}();

exports["default"] = DbControllers;