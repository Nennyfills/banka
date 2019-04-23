"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _adminControllers = _interopRequireDefault(require("../controllers/adminControllers"));

var _staffControllers = _interopRequireDefault(require("../controllers/staffControllers"));

var _defaultControllers = _interopRequireDefault(require("../controllers/defaultControllers"));

var _accountControllers = _interopRequireDefault(require("../controllers/accountControllers"));

var _transactionControllers = _interopRequireDefault(require("../controllers/transactionControllers"));

var _middleware = _interopRequireDefault(require("../middleware/middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// middlewares
var router = (0, _express.Router)();
router.post("/auth/signup", _userController["default"].signup);
router.post("/auth/account", _middleware["default"].authorized, _adminControllers["default"].createStaffAdminAccount);
router.post("/auth/login", _defaultControllers["default"].login);
router.post("/accounts", _middleware["default"].authorized, _userController["default"].createUserAccount);
router.get("/:accountnumber/transactions", _middleware["default"].authorized, _transactionControllers["default"].transactionByAccount);
router.patch("/:accountnumber", _middleware["default"].authorized, _adminControllers["default"].toggleAccountStatus);
router.post("/:accountnumber/credit", _middleware["default"].authorized, _staffControllers["default"].credit);
router.post("/:accountnumber/debit", _middleware["default"].authorized, _staffControllers["default"].debit);
router["delete"]("/accounts/:accountnumber", _middleware["default"].authorized, _accountControllers["default"]["delete"]);
router.get("/accounts/:accountnumber", _middleware["default"].authorized, _accountControllers["default"].accountsByAccountNumber);
router.get("/accounts", _middleware["default"].authorized, _accountControllers["default"].viewAllAccount);
router.get("/transactions/:transactionId", _middleware["default"].authorized, _transactionControllers["default"].transactionById);
router.get("/user/:email/accounts", _middleware["default"].authorized, _accountControllers["default"].accountsByEmail);
var _default = router;
exports["default"] = _default;