import { Router } from "express";

import UserController from "../controllers/userController";


const router = Router();

router.post("/api/v1/user/signup", UserController.signup);
router.post("/api/v1/user/accounts/create", UserController.create);

export default router;
