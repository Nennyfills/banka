import express from "express";
import bodyParser from "body-parser";
import router from "./server/routers";

const server = express();


server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use("/", router);

const app = server.listen(1500, () => console.log("Server on port 1500"));
module.exports = app;
