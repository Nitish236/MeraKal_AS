import { Router } from "express";

import { login } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/login/", login); // Route to Log In

export default authRoutes;
