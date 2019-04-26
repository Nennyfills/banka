"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var myconnection = process.env.TEST_ENV ? process.env.DBCONNECTIONTEST : process.env.DBCONNECTION;
console.log(myconnection);
var pool = new _pg.Pool({
  connectionString: myconnection
});
var _default = pool;
exports["default"] = _default;