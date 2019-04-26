"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routers/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var portal = process.env.PORT || 5001;
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].text());
app.use(_bodyParser["default"].json({
  type: "application/json"
}));
app.use(_bodyParser["default"].json());
app.use("/api/v1", _index["default"]);
app.get("/", function (req, res) {
  res.send("Home Page");
});
app.use("*", function (req, res) {
  res.status(404).json({
    status: 404,
    message: "Page not found"
  });
});
app.listen(portal);
module.exports = app;
console.log(portal)