

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import pool from "../db.js";
import { register, login } from "../controllers/auth.controller.js";
import validate from "../middlewares/validation.js";
import { registerSchema, loginSchema } from "../schemaValidation.js";
const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

export default router;