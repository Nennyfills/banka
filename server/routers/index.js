import { Router } from "express";


import UserController from "../controllers/userController";
import AdminController from "../controllers/adminControllers";
import StaffController from "../controllers/staffControllers";
import DefaultUserController from "../controllers/defaultControllers";
import AccountController from "../controllers/accountControllers";
import TransactionsController from "../controllers/transactionControllers";

// middlewares
import middleware from "../middleware/middleware";

const router = Router();

router.post("/auth/signup", UserController.signup);
router.post("/auth/account", middleware.authorized, AdminController.createStaffAdminAccount);
router.post("/auth/login", DefaultUserController.login);
router.post("/accounts", middleware.authorized, UserController.createUserAccount);
router.get("/:accountnumber/transactions", middleware.authorized, TransactionsController.transactionByAccount);
router.patch("/:accountnumber", middleware.authorized, AdminController.toggleAccountStatus);
router.post("/:accountnumber/credit", middleware.authorized, StaffController.credit);
router.post("/:accountnumber/debit", middleware.authorized, StaffController.debit);
router.delete("/accounts/:accountnumber", middleware.authorized, AccountController.delete);
router.get("/accounts/:accountnumber", middleware.authorized, AccountController.accountsByAccountNumber);
router.get("/accounts", middleware.authorized, AccountController.viewAllAccount);
router.get("/transactions/:transactionId", middleware.authorized, TransactionsController.transactionById);
router.get("/user/:email/accounts", middleware.authorized, AccountController.accountsByEmail);


export default router;
