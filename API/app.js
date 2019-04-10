import express from "express";
import bodyParser from "body-parser";
import router from "./server/routers";

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

const server = app.listen(8000, () => console.log("Server on port 8000"));
module.exports = server;
