import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { validateRegistration } from "../validators/auth.validator.js";
import validate from "../middleware/validate.js";

const auth_router = Router();

auth_router.post("/register", validateRegistration, validate, registerUser);
auth_router.post("/login", loginUser)
export default auth_router;
