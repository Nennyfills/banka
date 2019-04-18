import jwt from "jsonwebtoken";
import { database } from "../database/database";

module.exports = {
  authorized: (req, res, next) => {

    if (!req.headers.authorization) { 
      return res.status(401).send("Missing Authorizations");; 
    }
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);

    const users = database.USER.find(user => user.email === decoded.email);
    const admin = database.ADMIN.find(user => user.email === decoded.email);
    const staff = database.STAFF.find(user => user.email === decoded.email);

    const currentUser = users || admin || staff;

    if (!currentUser) {
      return res.status(404).send("Cannot find current user");
    }
    
    req.currentUser = decoded;
    return next();
  },
};
