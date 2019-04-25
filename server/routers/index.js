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

//  create admin and staff  * for admin only
router.post("/auth/portal", middleware.authorized, middleware.adminAuthentication, AdminController.createStaffAdminAccount);

// login routers * for all users
router.post("/auth/login", DefaultUserController.login);

// create bank accounts router *for users only
router.post("/accounts", middleware.authorized, middleware.clientAuthentication, UserController.createUserAccount);

//  deactivate and active account router * for admins only
router.patch("/:accountnumber", middleware.authorized, middleware.adminAuthentication, AdminController.toggleAccountStatus);

// credit and debit user account routers *for staff only
router.post("/:accountnumber/credit", middleware.authorized, middleware.staffAuthentication, StaffController.credit);
router.post("/:accountnumber/debit", middleware.authorized, middleware.staffAuthentication, StaffController.debit);

// delete account router * for both staff and admin
router.delete("/accounts/:accountnumber", middleware.authorized, middleware.isAdminAuthentication, AccountController.delete);

// get all account router * for both staff and admin
router.get("/accounts", middleware.authorized, middleware.isAdminAuthentication, AccountController.viewAllAccount);

//  get all account by status for both staff and admin
router.get("/accounts?status", middleware.authorized, middleware.isAdminAuthentication, AccountController.viewAllAccount);

// get all account date
router.get("/accounts?startDate&endDate", middleware.authorized, middleware.isAdminAuthentication, AccountController.viewAllAccount);

//  get account by account number
router.get("/accounts/:accountnumber", middleware.authorized, AccountController.accountsByAccountNumber);

// account by owner id
router.get("/user/:ownerid/accounts", middleware.authorized, AccountController.accountsByOwnerId);

//  get transactions by account number * for both admin and staff
router.get("/:accountnumber/transactions", middleware.authorized, middleware.isAdminAuthentication, TransactionsController.transactionByAccount);

//  get transactions by id
router.get("/transactions/:transactionId", middleware.authorized, TransactionsController.transactionById);

//  get transactions by date
router.get("/transactions?startDate&endDate", middleware.authorized, TransactionsController.viewAccountDate);

//  get accounts by email
router.get("/user/:email/accounts", middleware.authorized, middleware.clientAuthentication, AccountController.accountsByEmail);

export default router;
