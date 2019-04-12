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

const app = server.listen(port);
module.exports = app;
