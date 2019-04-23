import jwt from "jsonwebtoken";
import { database, findUserByEmail } from "../database/database";

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
    } catch (error) {
    }
    if (!currentUser) {
      return res.status(404).send("Cannot find current user");
    }

    req.currentUser = encoded;
    return next();
  },
};
