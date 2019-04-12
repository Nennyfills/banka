import { Router } from "express";

import UserController from "../controllers/userController";
import AdminController from "../controllers/adminControllers";
import StaffController from "../controllers/staffControllers";


const router = Router();

router.post("/api/v1/user/signup", UserController.signup);
// router.post("/api/v1/user/login",CommonActivities.login);
router.post("/api/v1/user/account/create", UserController.create);
router.get("/api/v1/user/:accountnumber/profile", UserController.profile);
// router.get("/api/v1/user/:accountnumber/transaction", UserController.transaction);
router.put("/api/v1/user/:accountnumber/deactivate", AdminController.deactivate);
router.put("/api/v1/user/:accountnumber/activate", AdminController.activate);
router.post("/api/v1/user/transactions/credit", StaffController.credit);
router.post("/api/v1/user/transactions/debit", StaffController.debit);
// router.post("/api/v1/user/:accountnumber/delete", CommonActivities.delete);
// router.get("/api/v1/user/accounts", CommonActivities.view);
// router.get("/api/v1/user/accounts/:accountnumber",CommonActivities);


export default router;
