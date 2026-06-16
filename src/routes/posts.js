
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import pool from "../db.js";
import { getAllPosts, createPost, updatePost, deletePost } from "../controllers/posts.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { postSchema } from "../schemaValidation.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

router.route("/")
    .get(getAllPosts)
    .post(verifyToken, validate(postSchema), createPost);

router.route("/:id")
    .put(verifyToken, updatePost)
    .delete(verifyToken, deletePost);


export default router;