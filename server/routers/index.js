import { Router } from "express";


import UserController from "../controllers/userController";
import AccountController from "../controllers/accountControllers";
import TransactionsController from "../controllers/transactionControllers";

// middlewares
import middleware from "../middleware/middleware";
import Validation from "../middleware/validation";

const router = Router();

// users router
// create users router
router.post("/auth/signup", Validation.signUp, UserController.signup);
//  create admin and staff  * for admin only
router.post("/auth/portal", middleware.authorized, middleware.adminAuthentication, Validation.adminCreate, UserController.createStaffAdminAccount);
// login routers * for all users
router.post("/auth/login", Validation.login, UserController.login);
// reset password routers for all users
router.post("/resetpassword", UserController.resetPassword);
// update profile image
router.put("/profileimage/save", middleware.authorized, UserController.login);
// create bank accounts router *for users only
router.post("/accounts", middleware.authorized, middleware.clientAuthentication, UserController.createUserAccount);


// accounts routers
//  deactivate and activate account router * for admins only
router.patch("/:accountnumber", middleware.authorized, middleware.adminAuthentication, AccountController.toggleAccountStatus);
// delete account router * for both staff and admin
router.delete("/accounts/:accountnumber", middleware.authorized, middleware.isAdminAuthentication, AccountController.delete);
// get all account router * for both staff and admin
router.get("/accounts", middleware.authorized, middleware.isAdminAuthentication, AccountController.viewAllAccount);
//  get all account by status for both staff and admin
router.get("/accounts?status", middleware.authorized, middleware.isAdminAuthentication, AccountController.viewAllAccount);
// get all account date
router.get("/accounts?startDate&endDate", middleware.authorized, middleware.isAdminAuthentication, AccountController.viewAllAccount);
//  get account by account number
router.get("/accounts/:accountnumber", middleware.authorized, middleware.isAdminAuthentication, AccountController.accountsByAccountNumber);
//  get accounts by email
router.get("/user/:email/accounts", middleware.authorized, AccountController.accountsByEmail);
// account by owner id
router.get("/user/accounts/:ownerId", middleware.authorized, AccountController.accountsByOwnerId);

// transaction
// credit and debit user account routers *for staff only
router.post("/transactions/:accountnumber/credit", middleware.authorized, middleware.staffAuthentication, Validation.credit, AccountController.credit);
router.post("/transactions/:accountnumber/debit", middleware.authorized, middleware.staffAuthentication, Validation.debit, AccountController.debit);
//  get transactions by account number * for both admin and staff
router.get("/:accountnumber/transactions", middleware.authorized, TransactionsController.transactionByAccountnumber);
//  get transactions by date
router.get("/:accountnumber/transactions?startDate&endDate", middleware.authorized, TransactionsController.transactionByAccountnumber);
//  get transactions by id
router.get("/transactions/:transactionId", middleware.authorized, TransactionsController.transactionById);
export default router;
