import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/auth", authRoutes);
server.use("/posts", postsRoutes);

server.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blogging API is running 🚀",
        endpoints: {
            register: "POST /auth/register",
            login: "POST /auth/login",
            getAllPosts: "GET /posts",
            createPost: "POST /posts",
            updatePost: "PUT /posts/:id",
            deletePost: "DELETE /posts/:id",
        },
    });
});

const PORT = process.env.PORT || 3000;

pool.connect()
    .then((client) => {
        client.release();
        console.log("✅ PostgreSQL Connected");
        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ PostgreSQL connection failed:", err);
        process.exit(1);
    });