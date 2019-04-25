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
// create users router
router.post("/auth/signup", UserController.signup);

//  create admin and staff router
router.post("/auth/portal", middleware.authorized, middleware.adminAuthentication, AdminController.createStaffAdminAccount);

// login routers
router.post("/auth/login", DefaultUserController.login);

// create bank accounts router
router.post("/accounts", middleware.authorized, UserController.createUserAccount);

//  deactivate and active account router
router.patch("/:accountnumber", middleware.authorized, middleware.adminAuthentication, AdminController.toggleAccountStatus);

// credit and debit user account routers
router.post("/:accountnumber/credit", middleware.authorized, middleware.staffAuthentication, StaffController.credit);
router.post("/:accountnumber/debit", middleware.authorized, middleware.staffAuthentication, StaffController.debit);

// delete account router
router.delete("/accounts/:accountnumber", middleware.authorized, AccountController.delete);

// get all account router
router.get("/accounts", middleware.authorized, AccountController.viewAllAccount);

//  get all account by status
router.get("/accounts?status", middleware.authorized, AccountController.viewAllAccount);

// get all account date
router.get("/accounts?startDate&endDate", middleware.authorized, AccountController.viewAllAccount);

//  get account by account number
router.get("/accounts/:accountnumber", middleware.authorized, AccountController.accountsByAccountNumber);

// account by owner id
router.get("/user/:ownerid/accounts", middleware.authorized, AccountController.accountsByOwnerId);

//  get transactions by account number
router.get("/:accountnumber/transactions", middleware.authorized, TransactionsController.transactionByAccount);

//  get transactions by id
router.get("/transactions/:transactionId", middleware.authorized, TransactionsController.transactionById);

//  get transactions by date
router.get("/transactions?startDate&endDate", middleware.authorized, TransactionsController.viewAccountDate);

//  get transactions by email
router.get("/user/:email/accounts", middleware.authorized, AccountController.accountsByEmail);

export default router;
