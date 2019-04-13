import env from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import router from "./server/routers";

env.config();
const server = express();
env.config();
const port = process.env.PORT;
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use("/", router);

router.get("/", (req, res) => {
  res.send("Home Page");
});
router.get("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.post("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.delete("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.put("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.patch("*", (req, res) => {
  res.send("API banka invalid url ");
});
const app = server.listen(port);
module.exports = app;
