import { Router } from "express";

import UserController from "../controllers/userController";
import AdminController from "../controllers/adminControllers";
import StaffController from "../controllers/staffControllers";
import DefaultUserController from "../controllers/defaultControllers";
import AccountController from "../controllers/accountControllers";

// middlewares
import middleware from "../middleware/middleware";

const router = Router();


router.post("/api/v1/auth/signup", UserController.signup);
router.post("/api/v1/auth/", AdminController.createStaffAdminAccount);
router.post("/api/v1/auth/login", DefaultUserController.login);
router.post("/api/v1/accounts", middleware.authorized, UserController.createUserAccount);
router.get("/api/v1/:accountnumber/transaction", middleware.authorized, UserController.transaction);
router.patch("/api/v1/:accountnumber", AdminController.toggleAccountStatus);
router.post("/api/v1/:accountnumber/credit", middleware.authorized, StaffController.credit);
router.post("/api/v1/:accountnumber/debit", middleware.authorized, StaffController.debit);
router.delete("/api/v1/accounts/:accountnumber", middleware.authorized, AccountController.delete);
router.get("/api/v1/:accountnumber/profile", middleware.authorized, AccountController.accountprofile);
router.get("/api/v1/accounts", middleware.authorized, AccountController.accounts);


export default router;
