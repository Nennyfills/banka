import { Router } from "express";

import UserController from "../controllers/userController";
import AdminController from "../controllers/adminControllers";
import StaffController from "../controllers/staffControllers";
import DefaultUserController from "../controllers/defaultControllers";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home Page");
});
router.get("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.post("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.delete("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.put("*", (req, res) => {
  res.send("API banka invalid url ");
});
router.patch("*", (req, res) => {
  res.send("API banka invalid url ");
});


router.post("/api/v1/auth/signup", UserController.signup);
router.post("/api/v1/auth/login", DefaultUserController.login);
router.post("/api/v1/account", UserController.create);
router.get("/api/v1/:accountnumber/profile", UserController.profile);
router.get("/api/v1/:accountnumber/transaction", UserController.transaction);
router.patch("/api/v1/:accountnumber", AdminController.deactivate);
router.patch("/api/v1/:accountnumber", AdminController.activate);
router.post("/api/v1/:accountnumber/credit", StaffController.credit);
router.post("/api/v1/:accountnumber/debit", StaffController.debit);
// router.post("/api/v1/accounts/:accountnumber", CommonActivities.delete);
// router.get("/api/v1/accounts", CommonActivities.view);
// router.get("/api/v1/accounts/:accountnumber",CommonActivities);


export default router;
