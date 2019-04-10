import { Router } from "express";

import UserController from "../controllers/userController";


const router = Router();

router.post("/api/v1/user/signup", UserController.signup);

export default router;
