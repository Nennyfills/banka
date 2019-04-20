import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";
import router from "./routers/index";

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
app.listen(portal);
module.exports = app;
