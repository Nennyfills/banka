import jwt from "jsonwebtoken";
import DbControllers from "../database/dbControllers";

module.exports = {
  authorized: (req, res, next) => {
    if (!req.headers.authorization) { return res.status(401); }
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);

    const users = DbControllers.getAllUsers().find(user => user.email === decoded.email);
    const admin = DbControllers.getAllAdmin().find(user => user.email === decoded.email);
    const staff = DbControllers.getAllStaff().find(user => user.email === decoded.email);

    const currentUser = users || admin || staff;

    if (!currentUser) {
      return res.status(404).send("Cannot find current user");
    }


    req.currentUser = decoded;
    return next();
  },
};
