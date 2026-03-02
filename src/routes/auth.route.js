import { Router } from "express";
// import { registerUser } from "../controllers/auth.controller.js";
import { validateRegistration } from "../validators/auth.validator.js";
import validate from "../middleware/validate.js";

const auth_router = Router();

// auth_router.post("/register", validateRegistration, validate, registerUser);
export default auth_router;
