import jwt from "jsonwebtoken";
import { findUserByEmail } from "../database/database";

module.exports = {
  authorized: async (req, res, next) => {

    const headerToken = req.headers.authorization.split(" ")[1];
    if (!headerToken) {      
      return res.status(401).send("Missing Authorizations");
    }
    const encoded = jwt.verify(headerToken, process.env.SECRET_KEY);
    let currentUser = null;
    try {
      currentUser = await findUserByEmail(encoded.email);
      if (!currentUser) {
        return res.status(404).send("Cannot find current user");
      }
      req.currentUser = encoded;
      return next();
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },
  adminAuthentication: async (req, res, next) => {
    const headerToken = req.headers.authorization.split(" ")[1];
    const encoded = jwt.verify(headerToken, process.env.SECRET_KEY);

    if (req.currentUser.permission !== "ADMIN") {
      return res.status(403).send("Forbidden");
    }
    req.currentUser = encoded;
    return next();
  },
  staffAuthentication: async (req, res, next) => {
    const headerToken = req.headers.authorization.split(" ")[1];
    const encoded = jwt.verify(headerToken, process.env.SECRET_KEY);

    if (req.currentUser.permission !== "STAFF") {
      return res.status(403).send("Forbidden");
    }
    req.currentUser = encoded;
    return next();
  },
  isAdminAuthentication: async (req, res, next) => {
    const headerToken = req.headers.authorization.split(" ")[1];
    const encoded = jwt.verify(headerToken, process.env.SECRET_KEY);

    if (req.currentUser.permission !== "ADMIN" || req.currentUser.permission !== "STAFF") {
      return res.status(403).send("Forbidden");
    }
    req.currentUser = encoded;
    return next();
  },
  clientAuthentication: async (req, res, next) => {
    const headerToken = req.headers.authorization.split(" ")[1];
    const encoded = jwt.verify(headerToken, process.env.SECRET_KEY);

    if (req.currentUser.permission !== "USER") {
      return res.status(403).send("Forbidden");
    }
    req.currentUser = encoded;
    return next();
  },
};
