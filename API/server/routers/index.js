import { Router } from "express";

import UserController from "../controllers/userController";


const router = Router();

router.post("/api/v1/user/signup", UserController.signup);
router.post("/api/v1/user/account/create", UserController.create);
router.get("/api/v1/user/:account/profile", UserController.profile);
router.get("/api/v1/user/:account/transaction", UserController.transaction);

export default router;
