/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import databaseController from "../database/database";


module.exports = {
  authorized: async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
          status: 401,
          message: "Missing Authorization",
        });
      }
      const headerToken = req.headers.authorization.split(" ")[1];
      const encoded = jwt.verify(headerToken, process.env.SECRET_KEY);
      req.currentUser = await databaseController.findUserByEmail(encoded.email);
      if (!req.currentUser) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Authorization",
        });
      }
      return next();
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },
  adminAuthentication: (req, res, next) => {
    if (req.currentUser.permission !== "ADMIN") {
      return res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    return next();
  },
  staffAuthentication: (req, res, next) => {
    if (req.currentUser.permission !== "STAFF") {
      return res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    return next();
  },
  isAdminAuthentication: (req, res, next) => {
    if (["ADMIN", "STAFF"].indexOf(req.currentUser.permission) === -1) {
      return res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    return next();
  },
  clientAuthentication: (req, res, next) => {
    if (req.currentUser.permission !== "USER") {
      return res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    return next();
  },
};
