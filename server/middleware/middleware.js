import jwt from "jsonwebtoken";
import { database } from "../database/database";

module.exports = {
  authorized: (req, res, next) => {
    const headerToken = req.headers.authorization.split(" ")[1];
    if (!headerToken) {
      return res.status(401).send("Missing Authorizations");
    }
    const encoded = jwt.verify(headerToken, process.env.SECRET_KEY);

    const users = database.USER.find(user => user.email === encoded.email);
    const admin = database.ADMIN.find(user => user.email === encoded.email);
    const staff = database.STAFF.find(user => user.email === encoded.email);

    const currentUser = users || admin || staff;

    if (!currentUser) {
      return res.status(404).send("Cannot find current user");
    }

    req.currentUser = encoded;
    return next();
  },
};
