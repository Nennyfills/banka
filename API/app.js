import express from "express";
import bodyParser from "body-parser";
import router from "./server/routers";

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

const server = app.listen(3500, () => console.log("Server on port 3500"));
module.exports = server;
