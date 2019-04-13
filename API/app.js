import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./server/routers";
import { port } from "./config";

const app = express();
const portal = process.env.PORT || port;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("*", (req, res) => {
  res.send("API banka invalid url ");
});
app.post("*", (req, res) => {
  res.send("API banka invalid url ");
});
app.delete("*", (req, res) => {
  res.send("API banka invalid url ");
});
app.put("*", (req, res) => {
  res.send("API banka invalid url ");
});
app.patch("*", (req, res) => {
  res.send("API banka invalid url ");
});
app.listen(portal);
console.log(portal);
console.log(process.env.PORT);
module.exports = app;
