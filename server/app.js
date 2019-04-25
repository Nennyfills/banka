import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";
// import { Client } from "pg";
import router from "./routers/index";
// import { Client } from "./database/power.db";


env.config();

const app = express();
const portal = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

// const client = new Client();
// async function execute() {
//   try {
//     await client.connect();
//     const users = await client.query("select * from users ");
//     console.table(users.rows);
//     const account = await client.query("select * from account ");
//     console.table(account.rows);
//     const transaction = await client.query("select * from transaction ");
//     console.table(transaction.rows);
//   } catch (ex) {
//   } finally {
//     await client.end();
//   }
// }
// execute();

app.listen(portal);
module.exports = app;
